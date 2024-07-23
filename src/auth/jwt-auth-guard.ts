import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, user, info, context) {
    const req = this.getRequest(context);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (!req) {
      throw new Error('Request object is undefined');
    }
    req['user'] = user;
    return user;
  }
}
