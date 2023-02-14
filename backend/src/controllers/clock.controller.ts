import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { ClockService } from 'src/services/clock.service';
import { AuthGuard } from './auth.grard';
@Controller('/api')
@UseGuards(AuthGuard)
export class ClockController {
  constructor(private appService: ClockService) {}
  @Get('/anchor')
  getServerTime(): Promise<number> {
    return this.appService.getServerTime();
  }
}
