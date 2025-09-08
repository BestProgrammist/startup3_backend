import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDocument } from 'src/user/schema/user.schema';

export class OnlyObserverGuard implements CanActivate {
  constructor(private reflektor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserDocument }>();
    const user = request.user;

    if (user.role !== 'OBSERVER')
      throw new ForbiddenException("Sorry you don't have an access!?");
    return user.role == 'OBSERVER' && true;
  }
}
