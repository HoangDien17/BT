import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.development.env',
    }),
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
