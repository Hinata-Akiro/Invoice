/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaymentStatus, Currency } from '../enums';
import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
class ItemDTO {
  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  rate: number;

  @Field()
  @IsNumber()
  quantity: number;
}

@InputType()
export class CreateInvoiceDTO {
  @Field()
  @IsString()
  customer: string;
  @Field()
  @IsString()
  invoiceNo: string;
  @Field()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
  @Field()
  @IsString()
  description: string;
  @Field()
  @IsEnum(Currency)
  currency: Currency;
  @Field()
  @IsNumber()
  taxRate: number;
  @Field()
  @IsDateString()
  issueDate: Date;
  @Field()
  @IsDateString()
  dueDate: Date;
  @Field()
  @IsString()
  note: string;
  @Field((type) => [ItemDTO])
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ItemDTO)
  items: Array<{ description: string; rate: number; quantity: number }>;
}
