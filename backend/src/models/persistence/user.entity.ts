import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class casdoor_user {
  @PrimaryColumn()
  public owner: string;

  @PrimaryColumn()
  public name: string;

  @Column()
  public created_time: string;

  @Column()
  public avatar: string;
}

export default casdoor_user;
