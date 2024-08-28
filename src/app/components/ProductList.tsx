"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  productName: string;
  price: number;
  description: string;
  imageURL: string;
  stock: number;
  category: string;
  productID: number;
  _id: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_RESTDB_API_URL as string, {
          headers: {
            'Content-Type': 'application/json',
            'x-apikey': process.env.NEXT_PUBLIC_RESTDB_API_KEY as string,
          },
        });
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
  <Link href={`/product/${product._id}`} key={product._id}>
    <div className="border p-4 rounded-lg shadow-lg cursor-pointer">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.imageURL}
          alt={product.productName}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <h3 className="text-lg font-bold">{product.productName}</h3>
    </div>
  </Link>
))}
      </div>
    </div>
  );
};

export default ProductList;
