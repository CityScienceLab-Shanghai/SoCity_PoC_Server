import { Controller, Get, Post, Query } from '@nestjs/common';

import { TransportationService } from '../services/transportation.service';

import CaptchaResponse from '../models/response/captcha.dto';

@Controller('/api')
export class TransportationController {
  constructor(private readonly appService: TransportationService) {}

  @Post('/captcha')
  triggerCaptcha(): Promise<CaptchaResponse> {
    return null;

    //return null;
  }
}
