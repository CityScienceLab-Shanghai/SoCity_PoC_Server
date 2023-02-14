import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class distance_increment {
  @PrimaryColumn()
  public distance_increments_id: number;

  @Column()
  public method: string;

  @Column()
  public increment: number;

  @Column()
  public transportation_record: number;
}

export default distance_increment;
