import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { Resend } from 'resend';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from './entities/user.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { ProfileService } from '../profile/profile.service';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string | null; role: string };
}

@Injectable()
export class AuthService {
  private readonly resend: Resend;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetsRepository: Repository<PasswordReset>,
    private readonly jwtService: JwtService,
    private readonly profileService: ProfileService,
  ) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('ელ-ფოსტა უკვე გამოყენებულია');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersRepository.save(
      this.usersRepository.create({
        name: dto.name,
        email: dto.email.toLowerCase(),
        passwordHash,
      }),
    );

    await this.profileService.ensureProfile(user);
    return this.buildResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) throw new UnauthorizedException('მომხმარებელი ვერ მოიძებნა');

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('პაროლი არასწორია');

    await this.profileService.ensureProfile(user);
    return this.buildResponse(user);
  }

  getMe(user: User): Omit<User, 'passwordHash'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _pw, ...rest } = user;
    return rest;
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) return { message: 'თუ ანგარიში არსებობს, ბმული გაიგზავნა' };

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await this.passwordResetsRepository.save(
      this.passwordResetsRepository.create({
        email: user.email,
        token,
        expiresAt,
      }),
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.resend.emails.send({
      from: 'dinamo tbilisi <noreply@dinamotbilisi.ge>',
      to: user.email,
      subject: 'პაროლის აღდგენა — Dinamo tbilisi',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
          <h2 style="color:#22c55e;">პაროლის აღდგენა</h2>
          <p>გამარჯობა, ${user.name ?? user.email}!</p>
          <p>დააჭირეთ ქვემოთ მოცემულ ღილაკს პაროლის შესაცვლელად:</p>
          <a href="${resetUrl}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#22c55e;color:#000;text-decoration:none;border-radius:6px;font-weight:bold;">
            პაროლის აღდგენა
          </a>
          <p style="color:#666;font-size:12px;">ბმული მოქმედია 1 საათის განმავლობაში.</p>
        </div>
      `,
    });

    return { message: 'თუ ანგარიში არსებობს, ბმული გაიგზავნა' };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const reset = await this.passwordResetsRepository.findOne({
      where: { token: dto.token },
    });

    if (!reset) throw new BadRequestException('ტოკენი არასწორია');
    if (reset.usedAt)
      throw new BadRequestException('ტოკენი უკვე გამოყენებულია');
    if (reset.expiresAt < new Date())
      throw new BadRequestException('ტოკენი ვადაგასულია');

    const user = await this.usersRepository.findOne({
      where: { email: reset.email },
    });
    if (!user) throw new NotFoundException('მომხმარებელი ვერ მოიძებნა');

    user.passwordHash = await bcrypt.hash(dto.password, 12);
    await this.usersRepository.save(user);

    reset.usedAt = new Date();
    await this.passwordResetsRepository.save(reset);

    return { message: 'პაროლი წარმატებით შეიცვალა' };
  }

  private buildResponse(user: User): AuthResponse {
    const accessToken = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
      { expiresIn: '7d' },
    );
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '30d' },
    );
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
