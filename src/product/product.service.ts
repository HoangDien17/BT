import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './dto/product';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, quantity, price } = createProductDto;
    const product: Product = await this.productModel.findOne({name});
    if(product) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
    }
    const resultCreate: Product = await this.productModel.create(createProductDto);
    return resultCreate;
  }
  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<any> {
    const { name, quantity, price } = updateProductDto;
    const checkUserExist: any = await this.productModel.findOne({name: name});
    if(checkUserExist) {
      if(id.localeCompare(checkUserExist._id) !== 0) {
        throw new HttpException('Product name already exists', HttpStatus.BAD_REQUEST);
      }
      await this.productModel.updateOne({_id: id}, updateProductDto);
    }
    await this.productModel.updateOne({_id: id}, updateProductDto);
    return { message: "Update product succesful"};
  }
  async getProduct(): Promise<Product[]> {
    return await this.productModel.find();
  }
  async deleteProduct(id: string): Promise<any> {
    const { deletedCount } = await this.productModel.deleteOne({_id: id})
    if(deletedCount === 0) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return {message: 'Delete product succesful'};
  }
}
