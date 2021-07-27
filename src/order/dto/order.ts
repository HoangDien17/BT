export class ProductDto {
  product: string;
  quantity: number;
}

export class OrderDto {
  products: ProductDto[]
}