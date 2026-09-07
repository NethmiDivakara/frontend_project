export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Products {
  id: number;
  category_id: number;
  category: Category;
  name: string;
  slug: string;
  description: string;
  sku: string;
  price: number;
  compare_price: number | null;
  stock_quantity: number;
  in_stock: boolean;
  thumbnail: string;
  thumbnail_url: string;
  images: string[];
  images_urls: string[];
  status: string; 
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

//one product response
export interface GetProductResponse {
  success: boolean;
  message: string;
  data: Products;
}

// Plural version 
export interface GetProductsResponse {
  success: boolean;
  message: string;
  data: Products[];
}