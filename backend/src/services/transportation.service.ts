import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import DistanceIncrement from 'src/models/persistence/distance_increment.entity';
import TransportationRecord from 'src/models/persistence/transportation_record.entity';

import TransportationDTO, {
  DistanceIncrementDTO,
} from 'src/models/request/transportation.dto';
import TransportationResponse from 'src/models/response/transportation.dto';
import { format } from 'date-fns';
@Injectable()
export class TransportationService {
  constructor(
    @InjectRepository(TransportationRecord)
    private transportationRecordRepo: Repository<TransportationRecord>,

    @InjectRepository(DistanceIncrement)
    private distanceIncrementRepo: Repository<DistanceIncrement>,
  ) {}

  async postOneLog(record: TransportationDTO): Promise<TransportationResponse> {
    const recordId = Math.floor(Math.random() * 100000000);
    const res1 = await this.transportationRecordRepo.save([
      {
        transportation_record_id: recordId,
        timestamp: format(record.timestamp, 'yyyy-MM-dd HH:mm:ss'),
      } as TransportationRecord,
    ]);

    const res = await this.distanceIncrementRepo.save(
      record.increments.map((increment) => {
        return {
          distance_increments_id: Math.floor(Math.random() * 100000000),
          method: increment.method,
          increment: increment.increment,
          transportation_record: recordId,
        } as DistanceIncrement;
      }),
    );

    return {
      msg: 'success',
      status: '200',
    };
  }
}
