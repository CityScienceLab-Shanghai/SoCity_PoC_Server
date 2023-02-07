import { Controller, Get, Post, Query } from '@nestjs/common';

import { ClockService } from '../services/clock.service';

import CaptchaResponse from '../models/response/captcha.dto';

@Controller('/api')
export class ClockController {
  constructor(private readonly appService: ClockService) {}

  @Post('/captcha')
  triggerCaptcha(): Promise<CaptchaResponse> {
    return null;

    //return null;
  }
}
