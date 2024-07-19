/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { Invoice } from './invoice.entity';
import { UserService } from 'src/user/user.service';
import { Inject } from '@nestjs/common';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { InvoiceService } from './invoice.service';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(InvoiceService) private invoiceService: InvoiceService,
  ) {}

  @Query(() => [Invoice])
  async invoices(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Query(() => Invoice, { nullable: true })
  async invoiceById(@Args('id') id: string): Promise<Invoice | undefined> {
    return this.invoiceService.findOne(id);
  }

  @Query(() => [Invoice], { nullable: true })
  async invoicesByCustomer(
    @Args('customerId') customerId: string,
  ): Promise<Invoice[]> {
    return this.invoiceService.findByCustomer(customerId);
  }

  @Mutation(() => Invoice)
  async createInvoice(
    @Args('invoiceData') invoiceData: CreateInvoiceDTO,
  ): Promise<Invoice> {
    return this.invoiceService.create(invoiceData);
  }
}
