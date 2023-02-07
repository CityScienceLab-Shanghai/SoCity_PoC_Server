import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { VerificationService } from '../services/verification.service';
import VerificationResponse, {
  VerificationVerifyResponse,
} from 'src/models/response/verfication.dto';
import VerificationRequest from 'src/models/request/verification.dto';

@Controller('/api')
export class VerificationController {
  constructor(private readonly appService: VerificationService) {}

  @Post('/verification')
  triggerVerification(
    @Body() body: VerificationRequest,
  ): Promise<VerificationResponse> {
    return this.appService.triggerVerification(
      body.email,
      body.captchaToken,
      body.captchaSecret,
    );
  }

  @Get('/verification')
  verifyVerification(
    @Query() query: { codeToken: string; codeSecret },
  ): Promise<VerificationVerifyResponse> {
    return null;
  }
}
