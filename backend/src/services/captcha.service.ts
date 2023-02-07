import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SDK } from 'casdoor-nodejs-sdk';
import CaptchaResponse, {
  CaptchaVerifyResponse,
} from 'src/models/response/captcha.dto';
import AxiosResponse from 'src/models/axios.dto';

import Axios from 'axios';

@Injectable()
export class CaptchaService {
  constructor(private configService: ConfigService) {}

  async getCaptcha(): Promise<CaptchaResponse> {
    const url =
      'http://' +
      this.configService.get<string>('casdoorEndpoint') +
      '/api/get-captcha';

    console.log(url);

    const response = (await Axios.get(url, {
      params: {
        id: 'admin/provider_captcha_default',
        applicationId: 'admin/provider_captcha_default',
        isCurrentProvider: true,
      },
      headers: {
        'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
      },
    })) as any;

    console.log(response.status, response.statusText);

    if (response.status == 200) {
      if (response.data.status == 'ok') {
        return {
          status: response.data.status,
          msg: response.statusText,
          data: {
            captchaToken: response.data.data.captchaId,
            captchaImage: response.data.data.captchaImage,
          },
        };
      } else {
        return {
          status: response.data.status,
          msg: response.statusText,
          data: {
            captchaToken: '',
            captchaImage: '',
          },
        };
      }
    }

    return {
      status: 'error',
      msg: 'Your request failed',
      data: {},
    } as CaptchaResponse;
  }

  async verifyCaptcha(
    captchaToken: string,
    captchaSecret: string,
  ): Promise<CaptchaVerifyResponse> {
    const url =
      this.configService.get<string>('casdoorEndpoint') + '/api/verify-captcha';

    const response = (await Axios.post(
      url,
      {
        captchaType: 'Default',
        captchaToken: captchaSecret,
        clientSecret: captchaToken,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
        },
      },
    )) as AxiosResponse;

    if (response.status == 200) {
      if (response.data.status == 'ok' && response.data.data == true) {
        return {
          status: 'ok',
          msg: response.statusText,
        };
      } else {
        return {
          status: 'wrong',
          msg: response.statusText,
        };
      }
    } else {
      return {
        status: 'error',
        msg: 'Your request failed',
      };
    }
  }
}
