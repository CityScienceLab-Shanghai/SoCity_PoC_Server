import { Injectable } from '@nestjs/common';

import { ContractResponse } from 'src/models/response/contracts.dto';

import * as fs from 'fs';

@Injectable()
export class ContractService {
  async getContracts(): Promise<ContractResponse[]> {
    const files = fs.readdirSync('./assets/contracts');

    return files
      .map((file) => {
        if (!file.endsWith('.sol')) return null;
        const name = file.split('.')[0];
        const content = fs.readFileSync(
          `./assets/contracts/${file}/${name}.json`,
          'utf8',
        );
        const address = fs.readFileSync(
          `./assets/contracts/${file}/address.txt`,
          'utf8',
        );
        const abi = JSON.parse(content).abi;
        return { name: name, abi: abi, address: address };
      })
      .filter((contract) => contract !== null);
  }
}
