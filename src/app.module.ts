import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
