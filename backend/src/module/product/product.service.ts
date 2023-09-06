import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
  ) {}

  async fetchAllProducts(): Promise<Product[]> {
    const result = await this.ProductModel.find().lean().exec();

    if (!result) throw new NotFoundException('No Products Found');

    const updatedResult = result.map((item) => {
      const { _id, ...otherProps } = item;
      const updatedItem = { id: item._id, ...otherProps };

      return updatedItem;
    });

    return updatedResult;
  }

  async fetchManyProductsByIds(ids: string[]): Promise<Product[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));

    try {
      let results = [];

      results = await this.ProductModel.find({
        _id: { $in: objectIds },
      }).exec();
      return results;
    } catch (error) {
      throw new error.message();
    }
  }
}
