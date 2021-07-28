import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ProductDto {
  @ApiProperty({description: 'ProductId is string'})
  @IsString()
  product: string;

  @ApiProperty({description: 'Quantity is number'})
  @IsNumber()
  quantity: number;
}

export class OrderDto {
  @ApiProperty({description: 'Array product and quantity'})
  products: ProductDto[]
}