import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order';
import { Order } from './order.model';


@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}
  async createOrder(userId: string, orderDto: OrderDto): Promise<any> {
    const item = {
      owner: userId,
      totalPrice: 0,
      products: orderDto
    }
    const {_id } = await this.orderModel.create(item);
    const order = await this.orderModel.findById(_id).populate('owner').populate('products.product')
    // const mathTotalPrice = order.products.reduce((sum, item) => {
    //   return sum + item.quantity * item.product.price
    // })
    let total: number;
    order.products.map(item => {
      
    })
    console.log(order)
  
    return {message: 'Create order succesful'};
  }

  async getOrderByUser(userId: string): Promise<Order[]> {
    return await this.orderModel.find({owner: userId}).populate('owner').populate('products.product')
  }
}
