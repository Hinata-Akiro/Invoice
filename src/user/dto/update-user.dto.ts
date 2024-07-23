import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}