import { Body, Get, Delete} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { OrderDto } from './dto/order';
import { OrderService } from './order.service';


@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject('ORDER_CLIENT') private readonly client: ClientProxy,
  ) {}

  @ApiOkResponse({description: 'Get order succesful'})
  @ApiBadRequestResponse({description: 'Bad request'})
  @Get()
  @UseGuards(new AuthGuard())
  async getOrderByUser() {
    const way = this.client.send('haha', 'VietNam')
    return way
    
  }

  @ApiCreatedResponse({description: 'Created order succesful'})
  @ApiBadRequestResponse({description: 'Bad request'})
  @Post()
  @UseGuards(new AuthGuard())
  async createOrder(@GetUser() user, @Body() orderDto: OrderDto) {
    return await this.orderService.createOrder(user.id, orderDto);
  }

  @ApiOkResponse({description: 'Delete Product succesful'})
  @ApiNotFoundResponse({description: 'Product not found'})
  @Delete()
  @UseGuards(new AuthGuard())
  async deleteOrder(@GetUser() user) {
    return await this.orderService.deleteOrder(user.id);
  }

}
