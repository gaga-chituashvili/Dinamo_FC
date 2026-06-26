import { Controller, Get } from '@nestjs/common';
import { TitlesService } from './titles.service';

@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  @Get()
  getTitles() {
    return this.titlesService.getTitles();
  }
}
