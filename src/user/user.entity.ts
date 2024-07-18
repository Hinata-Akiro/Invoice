/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTable } from '../base';
import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Invoice } from '../invoice/invoice.entity';

@ObjectType()
@Entity()
export class User extends BaseTable {
  @Field()
  @Column({ length: 50, nullable: false })
  username: string;

  @Field()
  @Column('text', { nullable: false })
  email: string;

  @Field()
  @Column('varchar', { length: 15 })
  phone: string;

  @Field()
  @Exclude()
  @Column('varchar', { length: 255 })
  password: string;

  @Field()
  @Column('text')
  address: string;

  @Field((type) => [Invoice], { nullable: true })
  @OneToMany((type) => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
