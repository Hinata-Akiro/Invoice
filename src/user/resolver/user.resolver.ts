/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../user.entity';
import { Inject } from '@nestjs/common';
import { Invoice } from '../../invoice/invoice.entity';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/user.dto';
import { InvoiceService } from 'src/invoice/invoice.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(InvoiceService) private invoiceService: InvoiceService,
  ) {}

  @Query((returns) => User)
  async getUserById(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Query((returns) => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ResolveField((returns) => [Invoice])
  async invoices(@Parent() customer): Promise<Invoice[]> {
    const { id } = customer;
    return this.invoiceService.findByCustomer(id);
  }
}
