import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    private userService: UserService,
  ) {}

  async create(invoice: CreateInvoiceDTO): Promise<Invoice> {
    const customer = await this.userService.findById(invoice.customer);
    if (!customer) {
      throw new Error(`Customer with id ${customer.id} not found`);
    }
    const subTotal = invoice.items.reduce((acc, curr) => {
      return acc + Number((curr.rate * curr.quantity).toFixed(2));
    }, 0);

    const taxAmount = subTotal * Number((invoice.taxRate / 100).toFixed(2));
    const total = subTotal + taxAmount;
    const outstandingBalance = total;
    return this.invoiceRepository.save({
      ...invoice,
      customer,
      subTotal,
      taxAmount,
      total,
      outstandingBalance,
    } as any);
  }

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  findByCustomer(id: string): Promise<Invoice[]> {
    return this.invoiceRepository
      .createQueryBuilder('invoice')
      .where('invoice.customer = :id', { id })
      .getMany();
  }

  findOne(id: string): Promise<Invoice> {
    return this.invoiceRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
