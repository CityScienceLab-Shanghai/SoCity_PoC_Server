import { Controller, Get, Post, Query } from '@nestjs/common';

import { ClockService } from 'src/services/clock.service';
@Controller('/api')
export class ClockController {
  constructor(private appService: ClockService) {}
  @Post('/anchor')
  getServerTime(): Promise<number> {
    return this.appService.getServerTime();
  }
}
