export class CreateProductDto {
  name: string;
  quantity: number;
  price: number;
}

export class UpdateProductDto {
  name?: string;
  quantity?: number;
  price?: number;
}
