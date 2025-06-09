import React from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/products";

const Catalog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Каталог товаров
          </h1>
          <p className="text-gray-600">Выберите понравившиеся товары</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalog;
