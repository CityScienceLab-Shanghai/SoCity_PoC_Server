import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from '../models/persistence/user.entity';

import UserDTO from '../models/response/user.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getOneByName(name: string): Promise<UserDTO> {
    const user = (await this.usersRepository.findOneBy({
      name: name,
    })) as User;

    return {
      owner: user.owner,
      created_time: user.created_time,
      avatar: user.avatar,
    } as UserDTO;
  }
}
