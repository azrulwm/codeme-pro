import { Module } from '@nestjs/common';

import { CourierService } from './courier.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourierSchema } from './courier.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Courier',
        schema: CourierSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [CourierService],
  exports: [CourierService],
})
export class CourierModule {}
