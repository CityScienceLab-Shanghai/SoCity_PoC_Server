import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class transportation_record {
  @PrimaryColumn()
  public transportation_record_id: number;

  @Column()
  public timestamp: string;
}

export default transportation_record;
