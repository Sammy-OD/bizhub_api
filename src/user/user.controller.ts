import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
