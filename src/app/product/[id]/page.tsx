"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
  productName: string;
  price: number;
  description: string;
  imageURL: string;
  stock: number;
  category: string;
  productID: number;
}

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RESTDB_API_URL}/${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-apikey': process.env.NEXT_PUBLIC_RESTDB_API_KEY as string,
          },
        });

        // Log the response status and body for debugging
        console.log('Response Status:', response.status);
        const data = await response.json();
        console.log('Response Data:', data);

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

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

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_RESTDB_API_URL}/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': process.env.NEXT_PUBLIC_RESTDB_API_KEY as string,
        },
      });

      if (response.ok) {
        router.push('/'); // Navigate to home after deletion
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product details: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md flex">
      <div className="w-1/2">
        <Image
          src={product?.imageURL || ''}
          alt={product?.productName || 'Product Image'}
          width={400}
          height={400}
          className="rounded"
          objectFit="cover"
        />
      </div>
      <div className="w-1/2 pl-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-semibold mb-2">{product?.productName}</h2>
          <p className="text-lg text-gray-700 mb-4">{product?.description}</p>
          <p className="text-xl text-gray-900 font-bold mb-2">${product?.price.toFixed(2)}</p>
          <p className="text-md text-gray-600 mb-1">Stock: {product?.stock}</p>
          <p className="text-md text-gray-600 mb-4">Category: {product?.category}</p>
        </div>
        <button
          onClick={handleDelete}
          className="self-end bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
