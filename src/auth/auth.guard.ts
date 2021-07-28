import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.headers['access-token']) {
      return false;
    }
    request.user = await this.validateToken(request.headers['access-token']);
    return true;
  }

  async validateToken(token: string) {
    if(!token) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    try {
      const decoded = await jwt.verify(token, 'hoahongden');
      return decoded;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    } 
  }
}