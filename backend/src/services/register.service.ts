import RegisterResponse from 'src/models/response/register.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios from 'axios';
import AxiosResponse from 'src/models/axios.dto';

@Injectable()
export class RegisterService {
  constructor(private configService: ConfigService) {}

  async register(
    username: string,
    email: string,
    password: string,
    wallet: string,
    description: string,
    codeSecret,
  ): Promise<RegisterResponse> {
    const url =
      'http://' +
      this.configService.get<string>('casdoorEndpoint') +
      '/api/signup';

    const response = (await Axios.post(
      url,
      {
        application: this.configService.get<string>('casdoorAppName'),
        organization: this.configService.get<string>('casdoorOrgName'),
        username: username,
        password: password,
        confirm: password,
        email: email,
        emailCode: codeSecret,
        agreement: true,
        phonePrefix: '86',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
        },
      },
    )) as AxiosResponse;

    if (response.status == 200) {
      if (response.data.status == 200) {
        return {
          status: 200,
          msg: response.data.msg,
        };
      } else {
        return {
          status: 400,
          msg: response.data.msg,
        };
      }
    }

    return {
      status: 400,
      msg: 'Your request failed',
    };
  }
}
