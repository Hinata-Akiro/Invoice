import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @Length(1, 50)
  readonly username: string;

  @Field()
  @IsEmail()
  readonly email: string;

  @Field({ nullable: true })
  @IsString()
  @Length(0, 15)
  @IsOptional()
  readonly phone?: string;

  @Field()
  @IsString()
  @Length(1, 255)
  readonly password: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly address?: string;
}
