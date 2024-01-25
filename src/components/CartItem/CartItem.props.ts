export interface CardItemProps {
  id: number;
  name: string;
  author?: string;
  isFavorite?: boolean;
  description?: string;
  image: string;
  price: number;
  count: number;
}
