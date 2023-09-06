import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../module/product/product.module';
import { OrderModule } from '../module/order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
