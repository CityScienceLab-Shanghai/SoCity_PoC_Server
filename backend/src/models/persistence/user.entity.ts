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

  @Column()
  public id: string;

  @Column()
  public display_name: string;

  @Column()
  public email: string;

  @Column()
  public homepage: string;

  @Column()
  public bio: string;

  @Column()
  public password: string;
}

export default casdoor_user;
