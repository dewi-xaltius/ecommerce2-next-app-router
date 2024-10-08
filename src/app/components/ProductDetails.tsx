"use client";

import { useState } from 'react';
import Image from 'next/image';
import DeleteProduct from '@/app/components/DeleteProduct';
import EditProductForm from './EditProductForm';

interface ProductDetailsProps {
  product: {
    _id: string;
    productName: string;
    price: number;
    description: string;
    imageURL: string;
    stock: number;
    category: string;
  };
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [productDetails, setProductDetails] = useState(product);

  const onUpdate = (updatedProduct: {
    _id: string;
    productName: string;
    price: number;
    description: string;
    imageURL: string;
    stock: number;
    category: string;
  }) => {
    setProductDetails(updatedProduct);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md flex relative">
      {isEditing ? (
        <EditProductForm 
          product={product} 
          setIsEditing={setIsEditing}
          onUpdate={onUpdate}/>  
      ) : (
        <>
          <div className="absolute top-4 right-4">
            <button
              onClick={handleEditClick}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
            >
              Edit
            </button>
          </div>
          <div className="w-1/2">
            <Image
              src={product.imageURL || ''}
              alt={product.productName || 'Product Image'}
              width={400}
              height={400}
              className="rounded"
              style={{ objectFit: 'cover', width: 'auto', height: 'auto' }}
              priority
            />
          </div>
          <div className="w-1/2 pl-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-semibold mb-2">{product.productName}</h2>
              <p className="text-lg text-gray-700 mb-4">{product.description}</p>
              <p className="text-xl text-gray-900 font-bold mb-2">${product.price.toFixed(2)}</p>
              <p className="text-md text-gray-600 mb-1">Stock: {product.stock}</p>
              <p className="text-md text-gray-600 mb-4">Category: {product.category}</p>
            </div>
            <DeleteProduct productId={product._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
