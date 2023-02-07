import AxiosResponse from 'src/models/axios.dto';
import VerificationResponse from 'src/models/response/verfication.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Axios from 'axios';

@Injectable()
export class VerificationService {
  constructor(private configService: ConfigService) {}

  async triggerVerification(
    email: string,
    captchaToken: string,
    captchaSecret: string,
  ): Promise<VerificationResponse> {
    const url =
      'http://' +
      this.configService.get<string>('casdoorEndpoint') +
      '/api/send-verification-code';

    const response = (await Axios.post(
      url,
      {
        checkType: 'Default',
        checkId: captchaToken,
        checkKey: captchaSecret,
        method: 'signup',
        dest: email,
        type: 'email',
        applicationId: 'admin/dapp',
        checkUser: 'undefined',
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )) as AxiosResponse;

    if (response.status == 200) {
      return {
        msg: response.data.status,
        status: response.data.status,
        data: {
          codeToken: email,
        },
      };
    }

    return {
      status: 'error',
      msg: 'Your request failed',
      data: { codeToken: '' },
    };
  }
}
