import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { memoryStorage } from 'multer';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getProfile(@Param('userId') userId: string) {
    return this.profileService.getProfile(userId);
  }

  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @Param('userId') userId: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(userId, user, dto);
  }

  @Post(':userId/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadAvatar(
    @Param('userId') userId: string,
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (userId !== user.id) throw new Error('Forbidden');
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    return this.profileService.updateAvatar(userId, base64);
  }
}
