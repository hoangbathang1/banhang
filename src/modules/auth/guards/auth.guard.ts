import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false;
    const token = request.headers.authorization.split('Bearer ')[1];
    const decodded = this.authService.verifyJWT(token);
    if (!decodded) {
      return false;
    }
    const user = request.user || (await this.authService.getAuthfromJwt(token));
    if (!user) {
      return false;
    }
    if (!request.user) request.user = user;
    if (!request.authUser) request.userId = decodded;
    if (!request.jwToken) request.jwToken = token;
    return true;
  }
}
