import { Controller, Get } from '@nestjs/common';
import { LiveService } from './live.service';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get()
  getLive() {
    return this.liveService.getLive();
  }
}
