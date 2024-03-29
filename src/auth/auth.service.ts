import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async register(dto: RegisterDto) {
    const password = await argon.hash(dto.password);

    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: dto.email
        }
      });

      if (existingUser) throw new ConflictException('Email already exists');

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstname: dto.firstname,
          lastname: dto.lastname,
          password,
          phone: dto.phone
        }
      });

      return {
        "message": "Registeration Successful",
        "statusCode": 201
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }

        throw error;
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const pwdMatches = await argon.verify(user.password, dto.password);

    if (!pwdMatches) throw new ForbiddenException('Invalid credentials')

    return this.signToken(user.id, user.email, user.firstname);
  }

  async signToken(userId: string, email: string, firstname: string): Promise<{accessToken: string}> {
    const payload = {
      sub: userId,
      email,
      firstname
    }

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: this.config.get('JWT_SECRET')
    })

    return {
      accessToken: token
    }
  }
}
