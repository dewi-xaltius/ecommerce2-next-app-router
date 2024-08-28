"use client";

import { useState, useEffect } from 'react';
import ProductDetails from '@/app/components/ProductDetails';
import DeleteProduct from '@/app/components/DeleteProduct';

interface Product {
  productName: string;
  price: number;
  description: string;
  imageURL: string;
  stock: number;
  category: string;
  _id: string;
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RESTDB_API_URL}/${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-apikey': process.env.NEXT_PUBLIC_RESTDB_API_KEY as string,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product details: {error}</p>;

  return (
    <>
      {product && (
        <div>
          <ProductDetails product={product} />
          <DeleteProduct productId={product._id} />
        </div>
      )}
    </>
  );
};

export default ProductPage;
