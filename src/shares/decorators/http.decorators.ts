import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { UserRole } from '../enums/user.enum';
import { AtGuards } from 'src/modules/auth/guards';
import { rolesGuard } from 'src/modules/auth/guards/roles.guard';

export const Roles = (roles: string[]): MethodDecorator & ClassDecorator => {
  const setMetaData = SetMetadata('roles', roles);
  return setMetaData;
};

export const UserAuth = (userRole?: UserRole[]): MethodDecorator & ClassDecorator => {
  return applyDecorators(UseGuards(AtGuards, rolesGuard), Roles(userRole));
};
