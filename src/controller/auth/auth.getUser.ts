import { createParamDecorator } from '@nestjs/common';
import { JwtUser } from '../../interface/global.interface';

export const CurrentUser = createParamDecorator((data, req): JwtUser => req.user);