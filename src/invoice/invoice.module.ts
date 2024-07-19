import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { Invoice } from './invoice.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), forwardRef(() => UserModule)],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService],
})
export class InvoiceModule {}
