import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/user/schema/user.interface';
import { OnlyAdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { OnlyObserverGuard } from '../guards/observer.guard';
import { OnlyUserGuard } from '../guards/user.guard';

export function Auth(role: UserRole = 'USER') {
  if (role === 'ADMIN') {
    return applyDecorators(UseGuards(JwtAuthGuard, OnlyAdminGuard));
  }

  if (role === 'OBSERVER') {
    return applyDecorators(UseGuards(JwtAuthGuard, OnlyObserverGuard));
  }

  // Default holat
  return applyDecorators(UseGuards(JwtAuthGuard, OnlyUserGuard));
}
