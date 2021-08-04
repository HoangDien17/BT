import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ClientsModule.register([
      {
        name: 'ORDER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3000
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
