import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Корзина пуста
            </h1>
            <p className="text-gray-600 mb-8">Добавьте товары из каталога</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Корзина</h1>
          <p className="text-gray-600">Управляйте вашими товарами</p>
        </div>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <Card key={item.product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.product.description}
                    </p>
                    <p className="text-lg font-bold text-primary mt-2">
                      {item.product.price.toLocaleString()} ₽
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-primary/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Итого:</span>
                <span className="text-2xl font-bold text-primary">
                  {getTotalPrice().toLocaleString()} ₽
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Cart;
