import { Controller, Get, UseGuards } from '@nestjs/common';

import { ContractService } from 'src/services/contract.service';
import { AuthGuard } from './auth.grard';

@Controller('/api')
//@UseGuards(AuthGuard)
export class ContractController {
  constructor(private appService: ContractService) {}
  @Get('/contracts')
  getContracts(): Promise<object> {
    return this.appService.getContracts();
  }
}
