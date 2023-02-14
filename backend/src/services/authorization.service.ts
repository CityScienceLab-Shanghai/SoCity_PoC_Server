import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import Axios from 'axios';
import * as jwt from 'jsonwebtoken';

export interface CasdoorUser {
  owner: string;
  name: string;
  createdTime: string;
  updatedTime: string;

  id: string;
  type: string;
  password?: string;
  passwordSalt?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  permanentAvatar?: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  location?: string;
  address: string[];
  affiliation?: string;
  title?: string;
  idCardType?: string;
  idCard?: string;
  homepage?: string;
  bio?: string;
  tag?: string;
  region?: string;
  language: string;
  gender?: string;
  birthday?: string;
  education?: string;
  score: number;
  karma: number;
  ranking: number;
  isDefaultAvatar: boolean;
  isOnline: boolean;
  isAdmin: boolean;
  isGlobalAdmin: boolean;
  isForbidden: boolean;
  isDeleted: boolean;
  signupApplication: string;
  hash?: string;
  preHash?: string;

  createdIp?: string;
  lastSigninTime?: string;
  lastSigninIp?: string;

  github?: string;
  google?: string;
  qq?: string;
  wechat?: string;
  facebook?: string;
  dingtalk?: string;
  weibo?: string;
  gitee?: string;
  linkedin?: string;
  wecom?: string;
  lark?: string;
  gitlab?: string;
  adfs?: string;
  baidu?: string;
  alipay?: string;
  casdoor?: string;
  infoflow?: string;
  apple?: string;
  azuread?: string;
  slack?: string;
  steam?: string;
  bilibili?: string;
  okta?: string;
  douyin?: string;
  custom?: string;

  ldap?: string;
  properties: Record<string, string>;
}

@Injectable()
export class AuthorizationService {
  constructor(private readonly configService: ConfigService) {}

  public parseJwtToken(token: string) {
    return jwt.verify(
      token,
      this.configService.get<string>('casdoorCertificate'),
      {
        algorithms: ['RS256'],
      },
    ) as CasdoorUser;
  }

  async getAccessToken(code: string): Promise<string> {
    const url =
      'http://' +
      this.configService.get<string>('casdoorEndpoint') +
      '/api/login/oauth/access_token';

    const response = await Axios.post(
      url,
      {},
      {
        params: {
          client_id: this.configService.get<string>('casdoorClientId'),
          client_secret: this.configService.get<string>('casdoorClientSecret'),
          grant_type: 'authorization_code',
          code: code,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
        },
      },
    );

    const {
      data: { access_token },
    } = response;
    if (!access_token) {
      return null;
    }

    const user = this.parseJwtToken(access_token);

    if (user) {
      return access_token;
    }

    return null;
  }

  async getUserName(token: string): Promise<string> {
    if (!token) {
      return null;
    }

    if (token === '') {
      return null;
    }

    if (token.split(' ')[0] !== 'Bearer') {
      return null;
    }

    const code = token.split(' ')[1];

    const user = this.parseJwtToken(code);

    if (user) {
      return user.name;
    }

    return null;
  }

  async getUserToken(token: string): Promise<string> {
    if (!token) {
      return null;
    }

    if (token === '') {
      return null;
    }

    if (token.split(' ')[0] !== 'Bearer') {
      return null;
    }

    const code = token.split(' ')[1];

    const user = this.parseJwtToken(code);

    if (user) {
      return code;
    }

    return null;
  }
}
