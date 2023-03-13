import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from 'src/models/persistence/user.entity';
import ProfileResponse, { UserResponse } from 'src/models/response/profile.dto';
import { AuthorizationService } from './authorization.service';
import { UserRequest } from 'src/models/request/profile.dto';

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
      username: user.display_name,
      email: user.email,
      wallet: user.homepage,
      description: user.bio,
      id: user.name,
    };
  }

  async getOneByEmail(email: string): Promise<ProfileResponse> {
    const user = (await this.usersRepository.findOneBy({
      email: email,
    })) as User;

    return {
      username: user.display_name,
      email: user.email,
      wallet: user.homepage,
      description: user.bio,
      id: user.name,
    };
  }

  async getOneByToken(code: string): Promise<ProfileResponse> {
    const cas = await this.authorizationService.getUserName(code);
    const name = cas;

    const user = (await this.usersRepository.findOneBy({
      name: name,
    })) as User;

    return {
      username: user.display_name,
      email: user.email,
      wallet: user.homepage,
      description: user.bio,
      id: user.name,
    };
  }

  async getAll(): Promise<ProfileResponse[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => {
      return {
        username: user.display_name,
        email: user.email,
        wallet: user.homepage,
        description: user.bio,
        id: user.name,
      };
    });
  }

  async update(body:UserRequest):Promise<UserResponse>{
    
    const user = (await this.usersRepository.findOneBy({
      name: body.id,
    })) as User;

    if(!user){
      return {
        msg:"not exist",
        status:"error"
      }
    }

    const params = {
      created_time: null,
      avatar: null,
      display_name: body.username,
      password : body.password,
      email: body.email,
      homepage: body.wallet,
      bio: body.description
    };

    for (let item in params) {
       if (typeof(params[item]) === 'undefined' || params[item] === null || params[item] === '') {
         delete params[item]
      }
    }

    await this.usersRepository.save({
      ...user,
      ...params
    });
    
    return {
      msg:'success',
      status:'OK'
    }
  }
}
