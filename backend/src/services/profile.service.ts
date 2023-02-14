import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from 'src/models/persistence/user.entity';
import ProfileResponse from 'src/models/response/profile.dto';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async getOneByName(name: string): Promise<ProfileResponse> {
    const user = (await this.usersRepository.findOneBy({
      name: name,
    })) as User;

    return {
      username: user.name,
      email: user.email,
      wallet: user.homepage,
      description: user.bio,
      id: user.id,
    };
  }

  async getOneByEmail(email: string): Promise<ProfileResponse> {
    const user = (await this.usersRepository.findOneBy({
      email: email,
    })) as User;

    return {
      username: user.name,
      email: user.email,
      wallet: user.homepage,
      description: user.bio,
      id: user.id,
    };
  }

  async getOneByToken(code: string): Promise<ProfileResponse> {
    const cas = await this.authorizationService.getUserName(code);
    const name = cas;

    const user = (await this.usersRepository.findOneBy({
      name: name,
    })) as User;

    return {
      username: user.name,
      email: user.email,
      wallet: user.homepage,
      description: user.bio,
      id: user.id,
    };
  }

  async getAll(): Promise<ProfileResponse[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => {
      return {
        username: user.name,
        email: user.email,
        wallet: user.homepage,
        description: user.bio,
        id: user.id,
      };
    });
  }
}
