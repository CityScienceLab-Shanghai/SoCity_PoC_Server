import { AuthorizationService } from './../services/authorization.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { LoginService } from 'src/services/login.service';
import LoginResponse, { LoginToken } from 'src/models/response/login.dto';
import LoginRequest from 'src/models/request/login.dto';
import LogoutResponse from 'src/models/response/logout.dto';
import { AuthGuard } from './auth.grard';
import { Request } from 'express';

@Controller('/api')
export class LoginController {
  constructor(
    private readonly appService: LoginService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Post('/login')
  login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return this.appService.login(body);
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request): Promise<LogoutResponse> {
    return this.appService.logout(request.headers.authorization);
  }

  @Get('/callback')
  callback(@Query() query: { code: string }): Promise<LoginToken> {
    const work = async () => {
      return {
        access_token: await this.authorizationService.getAccessToken(
          query.code,
        ),
        expire_time: Date.now(),
      };
    };
    return work();
  }
}
