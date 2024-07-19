/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Invoice } from 'src/invoice/invoice.entity';

@ObjectType()
export class UserResponseDto {
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
  phone: string;

  @Field()
  @Expose()
  address: string;

  @Field((type) => [Invoice], { nullable: true })
  @Expose()
  invoices: Invoice[];

  @Field()
  @Expose()
  createdAt: Date;

  @Field()
  @Expose()
  updatedAt: Date;
}
