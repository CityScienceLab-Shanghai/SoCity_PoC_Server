import TransportationResponse from 'src/models/response/transportation.dto';
import TransportationDTO from 'src/models/request/transportation.dto';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { TransportationService } from 'src/services/transportation.service';
import { AuthGuard } from './auth.grard';

@Controller('/api')
export class TransportationController {
  constructor(private readonly appService: TransportationService) {}

  @Post('/transportation/log')
  @UseGuards(AuthGuard)
  triggerCaptcha(
    @Body() body: TransportationDTO,
  ): Promise<TransportationResponse> {
    return this.appService.postOneLog(body);
  }
}
