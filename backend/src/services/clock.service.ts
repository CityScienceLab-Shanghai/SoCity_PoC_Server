import { ContractService } from 'src/services/contract.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ethers } from 'ethers';

@Injectable()
export class ClockService {
  private readonly logger = new Logger(ClockService.name);

  constructor(private contractService: ContractService) {}

  async getServerTime(): Promise<number> {
    return Date.now();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  triggerSettlement() {
    this.logger.log('Triggered once every 30 seconds');

    const provider = null;
    const signer = null;
    const address = null;
    const abi = null;
  }
}
