import { Body, Get, Delete } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { User as UserType } from 'src/user/user.model';
import { OrderDto } from './dto/order';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  @UseGuards(new AuthGuard())
  async getOrderByUser(@GetUser() user) {
    return await this.orderService.getOrderByUser(user.id);
  }

  @Post()
  @UseGuards(new AuthGuard())
  async createOrder(@GetUser() user, @Body() orderDto: OrderDto) {
    return await this.orderService.createOrder(user.id, orderDto);
  }

  @Delete()
  @UseGuards(new AuthGuard())
  async deleteOrder(@GetUser() user) {
    return await this.orderService.deleteOrder(user.id);
  }
}
