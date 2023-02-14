import { AuthorizationService } from './../services/authorization.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authorizationService: AuthorizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    try {
      const user = await this.authorizationService.getUserName(
        request.headers.authorization,
      );
      return user != null;
    } catch (e) {
      return false;
    }
    return false;
  }
}
