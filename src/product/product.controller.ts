import { Body, Controller, Post, Patch, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  
  @Post()
  @UseGuards(new AuthGuard())
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  @UseGuards(new AuthGuard())
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string
  ) {
    return await this.productService.updateProduct(id, updateProductDto)
  }

  @Get()
  @UseGuards(new AuthGuard())
  async getProduct() {
    return await this.productService.getProduct();
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
