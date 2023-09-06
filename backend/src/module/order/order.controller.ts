import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ProductService } from '../product/product.service';

@Controller('/orders')
export class OrderController {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
  ) {}

  @Post()
  async placeOrders(@Body('ids') ids: string[]) {
    const products = await this.productService.fetchManyProductsByIds(ids);

    const result = this.orderService.createOrder(products);

    return result;
  }
}
