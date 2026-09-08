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

export type ProductInput = {
  category_id: number
  name: string
  description: string
  price: number
  compare_price: number | null
  stock_quantity: number
  status: string
  is_featured: boolean
  thumbnail?: string
}
export interface ProductQuery {
  search?: string;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  is_featured?: boolean;
  in_stock_only?: boolean;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  per_page?: number;
  page?: number;
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
  meta?: {
    pagination?: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
      has_more_pages: boolean;
    };
  };
}