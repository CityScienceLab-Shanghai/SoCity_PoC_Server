import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from '../services/app.service';
import UserDTO from '../models/response/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/user')
  getOneByName(@Query() query: { name: string }): Promise<UserDTO> {
    console.log('test:', query.name);
    return this.appService.getOneByName(query.name);

    //return null;
  }
}
