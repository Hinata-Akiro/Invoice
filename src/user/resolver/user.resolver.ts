/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../user.entity';
import { Inject, Req, UseGuards } from '@nestjs/common';
import { Invoice } from '../../invoice/invoice.entity';
import { UserService } from '../user.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserDto,
    @Context() context,
  ): Promise<User> {
    const user = context.req.user;
    const userId = user.id;
    return await this.userService.updateUser(user.id, updateUserData);
  }
}
