import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const user = req.user;
    if (!user || !user.roles) {
      throw new ForbiddenException('Unable to access this resource');
    }

    const hasRole = () => user.roles.some((role) => roles.includes(role));
    if (!hasRole()) {
      throw new ForbiddenException('Unable to access this resource');
    }

    return true;
  }
}
