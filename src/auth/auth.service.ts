/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { VerifyPassword } from 'src/helper';
import { User } from 'src/user/user.entity';
import { LoginResponse } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    userEmail: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await this.userService.findUserByEmail(userEmail);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user && (await VerifyPassword(password, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async loginUser(user: Partial<User>): Promise<LoginResponse> {
    const payload = { sub: user?.id, username: user?.username };
    return {
      username: user?.username,
      id: user?.id,
      email: user?.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserById(id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
