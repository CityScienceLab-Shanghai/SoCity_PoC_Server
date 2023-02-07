import AxiosResponse from 'src/models/axios.dto';
import LoginResponse from 'src/models/response/login.dto';
import LoginRequest from 'src/models/request/login.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios from 'axios';

@Injectable()
export class LoginService {
  constructor(private configService: ConfigService) {}

  async login(body: LoginRequest): Promise<LoginResponse> {
    const url =
      'http://' +
      this.configService.get<string>('casdoorEndpoint') +
      '/api/login';

    const env = this.configService.get<string>('env');

    const host =
      env === 'development'
        ? 'http://dev_backend:3000'
        : 'http://prod_backend:3000';

    const response = (await Axios.post(
      url,
      {
        application: this.configService.get<string>('casdoorAppName'),
        organization: this.configService.get<string>('casdoorOrgName'),
        username: body.username,
        password: body.password,
        autoSignin: true,
        captchaType: 'Default',
        captchaToken: body.captchaSecret,
        clientSecret: body.captchaToken,
        type: 'code',
        phonePrefix: '86',
        samlRequest: '',
      },
      {
        params: {
          clientId: this.configService.get<string>('casdoorClientId'),
          responseType: 'code',
          redirectUri: host + '/api/callback',
          scope: 'read',
          state: 'casdoor',
          nonce: null,
          code_challenge_method: null,
          code_challenge: null,
        },
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
        },
        maxRedirects: 5,
      },
    )) as AxiosResponse;

    console.log(response);

    if (response.data.status == 'ok') {
      return {
        status: 'ok',
        msg: response.data.msg,
        data: {
          access_token: response.data.data,
          expire_time: Date.now(),
        },
      };
    }
    return {
      status: 'error',
      msg: 'Your request failed',
      data: {
        access_token: '',
        expire_time: 0,
      },
    };
  }
}
