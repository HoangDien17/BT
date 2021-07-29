import { Body, Controller, Post, Patch, Param, Get, Delete, UseGuards} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBasicAuth, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  
  @Roles('admin')
  @ApiCreatedResponse({type: CreateProductDto, description: 'Created product succesful'})
  @ApiBadRequestResponse({description: 'Bad request'})
  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RolesGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Roles('admin')
  @ApiOkResponse({description: 'Update product succesful'})
  @ApiBadRequestResponse({description: 'Update failure'})
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RolesGuard)
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string
  ) {
    return await this.productService.updateProduct(id, updateProductDto)
  }

  @Roles('admin')
  @ApiOkResponse({description: 'Get Product succesful', isArray: true})
  @ApiBadRequestResponse({description: 'Bad request'})
  @ApiBearerAuth()
  @Get()
  @UseGuards(new AuthGuard(),RolesGuard)
  async getProduct() {
    return await this.productService.getProduct();
  }

  @Roles('admin')
  @ApiOkResponse({description: 'Delete Product succesful'})
  @ApiNotFoundResponse({description: 'Product not found'})
  @Delete(':id')
  @UseGuards(new AuthGuard(), RolesGuard)
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
