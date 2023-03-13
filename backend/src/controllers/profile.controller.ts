import { AuthorizationService } from './../services/authorization.service';
import {
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ProfileService } from 'src/services/profile.service';

import ProfileResponse,{UserResponse} from 'src/models/response/profile.dto';
import {UserRequest} from 'src/models/request/profile.dto'
import { AuthGuard } from './auth.grard';


@Controller('/api')
export class ProfileController {
  constructor(private readonly appService: ProfileService) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
  getProfile(
    @Headers('authorization') auth: string,
    @Query() query: { username: string; email: string },
  ): Promise<ProfileResponse> {
    if (!query.username && !query.email) {
      return this.appService.getOneByToken(auth);
    } else if (query.username && query.username != '') {
      return this.appService.getOneByName(query.username);
    } else {
      return this.appService.getOneByEmail(query.email);
    }
  }

  @Post('/profile')
  @UseGuards(AuthGuard)
  postProfile(
    @Body() body:UserRequest
  ):Promise<UserResponse> {
    return this.appService.update(body);
  }

  @Get('/profiles')
  @UseGuards(AuthGuard)
  getProfiles(): Promise<ProfileResponse[]> {
    return this.appService.getAll();
  }
}
