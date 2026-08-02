export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  created_at: Date;
}

export interface CreateProductDto {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface UpdateProductDto {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

