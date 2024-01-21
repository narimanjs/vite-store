export interface ProductCardProps {
  id: number;
  name: string;
  author?: string;
  isFavorite?: boolean;
  description: string;
  image: string;
  price: number;
  rating: number;
}
