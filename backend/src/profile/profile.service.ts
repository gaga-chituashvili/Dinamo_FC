import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FanProfile } from './entities/fan-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(FanProfile)
    private readonly profileRepository: Repository<FanProfile>,
  ) {}

  async getProfile(userId: string): Promise<FanProfile> {
    const profile = await this.profileRepository.findOne({
      where: { userId },
    });

    if (!profile) throw new NotFoundException('პროფილი ვერ მოიძებნა');
    return profile;
  }

  async ensureProfile(user: User): Promise<FanProfile> {
    const existing = await this.profileRepository.findOne({
      where: { userId: user.id },
    });
    if (existing) return existing;

    return this.profileRepository.save(
      this.profileRepository.create({
        userId: user.id,
        email: user.email,
        name: user.name,
      }),
    );
  }

  async updateProfile(
    userId: string,
    requestingUser: User,
    dto: UpdateProfileDto,
  ): Promise<FanProfile> {
    if (userId !== requestingUser.id) {
      throw new ForbiddenException('სხვის პროფილის რედაქტირება დაუშვებელია');
    }

    const profile = await this.ensureProfile(requestingUser);
    Object.assign(profile, dto);
    profile.completionScore = this.calcCompletionScore(profile);
    return this.profileRepository.save(profile);
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<FanProfile> {
    const profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) throw new NotFoundException('პროფილი ვერ მოიძებნა');
    profile.avatarUrl = avatarUrl;
    return this.profileRepository.save(profile);
  }

  private calcCompletionScore(profile: FanProfile): number {
    const fields: (keyof FanProfile)[] = [
      'name',
      'bio',
      'headline',
      'jobTitle',
      'company',
      'location',
      'avatarUrl',
    ];
    const filled = fields.filter((f) => !!profile[f]).length;
    return Math.round((filled / fields.length) * 100);
  }
}
