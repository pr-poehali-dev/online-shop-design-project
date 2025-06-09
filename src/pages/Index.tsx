import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center space-y-8 max-w-md mx-auto p-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">TechShop</h1>
          <p className="text-xl text-gray-600 mb-8">
            Ваш любимый магазин техники и гаджетов
          </p>
        </div>

        <Button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-8 py-3 text-lg bg-primary hover:bg-primary/90 transition-all hover:scale-105"
          size="lg"
        >
          Регистрация / Авторизация
        </Button>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Index;
