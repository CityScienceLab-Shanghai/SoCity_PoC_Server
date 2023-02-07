import { Controller, Get, Post, Query } from '@nestjs/common';

import { ProfileService } from 'src/services/profile.service';

import ProfileResponse from 'src/models/response/profile.dto';

@Controller('/api')
export class ProfileController {
  constructor(private readonly appService: ProfileService) {}

  @Get('/profile')
  getProfile(
    @Query() query: { username: string; email: string },
  ): Promise<ProfileResponse> {
    return null;
  }

  @Get('/profiles')
  getProfiles(): Promise<ProfileResponse[]> {
    return null;
  }
}
