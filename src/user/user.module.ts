import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { User } from './user.entity';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './user.service';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => InvoiceModule)],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
