import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveService } from './live.service';
import { LiveController } from './live.controller';
import { User } from '../auth/entities/user.entity';
import { AppBootstrapService } from '../app.bootstrap.service';
import { StandingsService } from '../standings/standings.service';
import { FixturesService } from '../fixtures/fixtures.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LiveController],
  providers: [LiveService, AppBootstrapService, StandingsService, FixturesService],
  exports: [LiveService],
})
export class LiveModule {}
