import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courier } from './courier.model';

@Injectable()
export class CourierService {
  constructor(
    @InjectModel('Courier')
    private readonly CourierModel: Model<Courier>,
  ) {}

  async fetchCourierCharges(weight: number) {
    const result = await this.CourierModel.findOne({
      $and: [{ minWeight: { $lte: weight } }, { maxWeight: { $gte: weight } }],
    })
      .lean()
      .exec();

    console.log(result);
    return result.charge;
  }
}
