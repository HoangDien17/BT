import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { OrderDto } from './dto/order';
import { Order } from './order.model';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @Inject('ORDER_CLIENT') private readonly client: ClientProxy,
  ) {}
  async createOrder(userId: string, orderDto: OrderDto): Promise<any> {
    const item = {
      owner: userId,
      totalPrice: 0,
      products: orderDto
    }
    const checkCoupon = await lastValueFrom(this.client.send('checkCoupon', {}));
    if(checkCoupon === true) {
      const {_id } = await this.orderModel.create(item);
      const order = await this.orderModel.findById(_id).populate('owner').populate('products.product')
      const mathTotalPrice = order.products.reduce((sum, item: any) => {
        return sum + item['quantity'] * item.product['price']
      },0)
      const result = await this.orderModel.updateOne({_id: _id}, {totalPrice: mathTotalPrice});
      return {message: 'Create order successful'}
    }
    throw new HttpException('Coupon not found', HttpStatus.ACCEPTED);
  }

  async getOrderByUser(userId: string): Promise<Order[]> {
    return await this.orderModel.find({owner: userId}).populate('owner').populate('products.product')
  }

  async deleteOrder(userId: string): Promise<any> {
    const { deletedCount } = await this.orderModel.deleteOne({owner: userId});
    if(deletedCount === 0) {
      throw new HttpException('No order found', HttpStatus.NOT_FOUND);
    }
    return {message: 'Delete order successful'};
  }
}
