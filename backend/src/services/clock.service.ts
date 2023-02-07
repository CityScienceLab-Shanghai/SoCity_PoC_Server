import { Injectable } from '@nestjs/common';

@Injectable()
export class ClockService {
  async getServerTime(): Promise<number> {
    return Date.now();
  }
}
