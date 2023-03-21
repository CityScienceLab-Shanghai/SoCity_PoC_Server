import { AuthorizationService } from './authorization.service';
import AxiosResponse from 'src/models/axios.dto';
import LoginResponse from 'src/models/response/login.dto';
import LoginRequest from 'src/models/request/login.dto';
import { Injectable, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios from 'axios';
import LogoutResponse from 'src/models/response/logout.dto';

@Injectable()
export class LoginService {
  constructor(
    private configService: ConfigService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async login(body: LoginRequest): Promise<LoginResponse> {
    const url =
      'http://' +
      this.configService.get<string>('casdoorEndpoint') +
      '/api/login';

    const env = this.configService.get<string>('env');

    const host = env === 'development' ? 'http://dev:3000' : 'http://prod:3000';

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

    if (response.data.status == 200) {
      if (response.data.data) {
        const token = await this.authorizationService.getAccessToken(
          response.data.data,
        );
        if (token) {
          return {
            status: 200,
            msg: response.data.msg,
            data: {
              access_token: token,
              expire_time: Date.now(),
            },
          };
        }
      }
    }
    return {
      status: 400,
      msg: 'Your request failed',
      data: {
        access_token: '',
        expire_time: 0,
      },
    };
  }

  async logout(token: string): Promise<LogoutResponse> {
    const url =
      'http://' +
      this.configService.get<string>('casdoorEndpoint') +
      '/api/delete-token';

    const response = (await Axios.post(
      url,
      {
        access_token: await this.authorizationService.getUserToken(token),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )) as AxiosResponse;

    if (response.status == 200) {
      return {
        msg: response.data.msg,
        status: response.data.status,
      };
    }

    return {
      msg: 'ok',
      status: 200,
    };
  }
}
