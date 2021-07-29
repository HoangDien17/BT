import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata(process.env.ROLE_KEY, roles);