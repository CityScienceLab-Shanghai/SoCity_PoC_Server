import { Controller, Get, Post, Query } from '@nestjs/common';

import { CaptchaService } from '../services/captcha.service';

import CaptchaResponse, {
  CaptchaVerifyResponse,
} from '../models/response/captcha.dto';

@Controller('/api')
export class CaptchaController {
  constructor(private readonly appService: CaptchaService) {}

  @Post('/captcha')
  triggerCaptcha(): Promise<CaptchaResponse> {
    return this.appService.getCaptcha();
  }

  @Get('/captcha')
  verifyCaptcha(
    @Query() query: { captchaToken: string; captchaSecret },
  ): Promise<CaptchaVerifyResponse> {
    return this.appService.verifyCaptcha(
      query.captchaToken,
      query.captchaSecret,
    );
  }
}