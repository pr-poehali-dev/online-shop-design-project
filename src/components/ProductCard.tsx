import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <Card
      className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />

          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 animate-fade-in">
              <div className="text-white mb-3">
                <p className="text-lg font-bold">
                  {product.price.toLocaleString()} ₽
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  В корзину
                </Button>
                <Button
                  onClick={handleToggleFavorite}
                  variant={isFavorite(product.id) ? "default" : "outline"}
                  className={`flex-1 ${isFavorite(product.id) ? "bg-red-500 hover:bg-red-600" : "bg-white text-black hover:bg-gray-100"}`}
                  size="sm"
                >
                  {isFavorite(product.id) ? "❤️" : "🤍"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
