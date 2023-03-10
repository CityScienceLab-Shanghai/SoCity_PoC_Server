import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { RegisterService } from 'src/services/register.service';
import RegisterRequest from 'src/models/request/register.dto';
import RegisterResponse from 'src/models/response/register.dto';

@Controller('/api')
export class RegisterController {
  constructor(private readonly appService: RegisterService) {}

  @Post('/register')
  register(@Body() body: RegisterRequest): Promise<RegisterResponse> {
    return this.appService.register(
      body.username,
      body.email,
      body.password,
      body.wallet,
      body.description,
      body.codeSecret,
    );
  }
}
