import { Field, ObjectType } from '@nestjs/graphql';
import { Invoice } from '../invoice.entity';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

@ObjectType()
export class InvoiceResponse extends Invoice {
  @Field()
  @Expose()
  @IsString()
  id: string;

  @Field()
  @Expose()
  createdAt: Date;

  @Field()
  @Expose()
  updatedAt: Date;
}
