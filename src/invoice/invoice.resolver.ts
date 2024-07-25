/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { Invoice } from './invoice.entity';
import { UserService } from 'src/user/user.service';
import { Inject, UseGuards } from '@nestjs/common';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { InvoiceResponse } from './dto/invoice-response.dto';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(InvoiceService) private invoiceService: InvoiceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Invoice])
  async invoices(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Invoice, { nullable: true })
  async invoiceById(@Args('id') id: string): Promise<Invoice | undefined> {
    return this.invoiceService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Invoice], { nullable: true })
  async invoicesByCustomer(
    @Args('customerId') customerId: string,
  ): Promise<Invoice[]> {
    return this.invoiceService.findByCustomer(customerId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => InvoiceResponse)
  async createInvoice(
    @Args('invoiceData') invoiceData: CreateInvoiceDTO,
    @Context() context,
  ): Promise<InvoiceResponse> {
    const user = context.req.user;
    invoiceData['customer'] = user.id;
    return this.invoiceService.create(invoiceData);
  }
}
