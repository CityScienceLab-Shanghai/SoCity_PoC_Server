import { ContractService } from 'src/services/contract.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ContractResponse } from 'src/models/response/contracts.dto';
import { ethers } from 'ethers';

@Injectable()
export class ClockService {
  private readonly logger = new Logger(ClockService.name);

  constructor(private contractService: ContractService) {}

  async getServerTime(): Promise<number> {
    return Date.now();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async triggerSettlement() {
    this.logger.log('Triggered once every 30 seconds');

    const privateKey = process.env.ALCHEMY_PRIVATE_KEY || '';

    const publicKey = process.env.ALCHEMY_PUBLIC_KEY || '';

    const network = process.env.GOERLI_RPC_URL || '';

    const provider = ethers.getDefaultProvider(network);

    const wallet = new ethers.Wallet(privateKey, provider);

    const contracts =
      (await this.contractService.getContracts()) as ContractResponse[];

    const { name, abi, address } = contracts.find(
      (contract) => contract.name === 'Token',
    );

    const contract = new ethers.Contract(address, abi, wallet);

    const rest = await contract.balanceOf(publicKey);

    this.logger.log('Rest balance:' + rest.toString());
  }
}
