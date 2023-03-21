import { Controller, Get, UseGuards } from '@nestjs/common';

import { ContractService } from 'src/services/contract.service';
import { AuthGuard } from './auth.grard';

import { ContractResponse } from 'src/models/response/contracts.dto';

@Controller('/api')
@UseGuards(AuthGuard)
export class ContractController {
  constructor(private appService: ContractService) {}
  @Get('/contracts')
  getContracts(): Promise<ContractResponse[]> {
    return this.appService.getContracts();
  }
}
