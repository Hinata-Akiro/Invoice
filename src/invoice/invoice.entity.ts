/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTable } from '../base';
import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Currency, PaymentStatus } from './enums';
import { Item } from './types/invoice.type';

@ObjectType()
@Entity()
export class Invoice extends BaseTable {
  @Field()
  @Column({ length: 500, nullable: false })
  invoiceNo: string;
  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column({
    type: 'varchar',
    default: PaymentStatus.NOT_PAID,
  })
  paymentStatus: PaymentStatus;

  @Field()
  @Column({
    type: 'varchar',
    default: Currency.USD,
  })
  currency: Currency;

  @Field()
  @Column('float')
  taxRate: number;
  @Field()
  @Column('timestamptz')
  issueDate: string;
  @Field()
  @Column('timestamptz')
  dueDate: string;
  @Field()
  @Column('text')
  note: string;

  @Field((type) => [Item])
  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  items: Item[];

  @Column()
  @Field()
  taxAmount: number;
  @Column('float')
  @Field()
  subTotal: number;
  @Column()
  @Field()
  total: string;
  @Column({
    default: 0,
  })
  @Field()
  amountPaid: number;
  @Column()
  @Field()
  outstandingBalance: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (customer) => customer.invoices)
  customer: User;
}
