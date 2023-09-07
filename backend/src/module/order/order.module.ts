import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductModule } from '../product/product.module';
import { CourierModule } from '../courier/courier.module';

@Module({
  imports: [ProductModule, CourierModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
