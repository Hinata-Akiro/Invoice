/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginResponse, LoginUserInput } from 'src/user/dto/login-user.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation((returns) => LoginResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    return this.authService.login(user);
  }

  @Mutation((returns) => UserResponseDto)
  async createCustomer(
    @Args('userData') userData: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(userData);
  }
}
