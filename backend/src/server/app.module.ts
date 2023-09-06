import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../module/product/product.module';

console.log(process.env.DATABASE_URL);

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL), ProductModule],
})
export class AppModule {}
