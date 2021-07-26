import { Body, Controller, Post, Patch, Param, Get, Delete } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string
  ) {
    return await this.productService.updateProduct(id, updateProductDto)
  }

  @Get()
  async getProduct() {
    return await this.productService.getProduct();
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
