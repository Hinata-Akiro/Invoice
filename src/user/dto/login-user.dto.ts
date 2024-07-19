import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  @Expose()
  id: string;

  @Field()
  @Expose()
  username: string;

  @Field()
  @Expose()
  email: string;

  @Field()
  @Expose()
  access_token: string;
}
