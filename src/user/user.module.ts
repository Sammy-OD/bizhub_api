import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [JwtService]
})
export class UserModule {}
