import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({description: 'Product name is string'})
  @IsString()
  name: string;

  @ApiProperty({description: 'Product quantity is number'})
  @IsNumber()
  quantity: number;

  @ApiProperty({description: 'Product price is number'})
  @IsNumber()
  price: number;
}

export class UpdateProductDto {
  @ApiPropertyOptional({required: false, description: 'Product name is string and optional'})
  @IsString()
  name?: string;

  @ApiPropertyOptional({required: false, description: 'Product quantity is number and optional'})
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({required: false, description: 'Product price is number and optional'})
  @IsNumber()
  price?: number;
}
