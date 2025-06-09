import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  const getNavigationButtons = () => {
    const currentPath = location.pathname;
    const buttons = [
      { name: "Главная", path: "/catalog" },
      { name: "Каталог", path: "/catalog" },
      { name: "Избранное", path: "/favorites" },
      { name: "Корзина", path: "/cart" },
      { name: "Личный кабинет", path: "/profile" },
    ];

    return buttons.filter((button) => button.path !== currentPath);
  };

  const getButtonText = (name: string) => {
    if (name === "Корзина" && cartItems.length > 0) {
      return `Корзина (${cartItems.length})`;
    }
    if (name === "Избранное" && favorites.length > 0) {
      return `Избранное (${favorites.length})`;
    }
    return name;
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-primary hover:text-primary/80"
        >
          TechShop
        </Button>

        <nav className="flex gap-4">
          {getNavigationButtons().map((button) => (
            <Button
              key={button.name}
              variant="outline"
              onClick={() => navigate(button.path)}
              className="hover:bg-primary hover:text-white transition-all"
            >
              {getButtonText(button.name)}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
