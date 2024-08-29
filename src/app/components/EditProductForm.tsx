"use client";

import { useState } from 'react';

interface EditProductFormProps {
  product: {
    _id: string;
    productName: string;
    price: number;
    description: string;
    imageURL: string;
    stock: number;
    category: string;
  };
  setIsEditing: (value: boolean) => void;
  onUpdate: (updatedProduct: {
    _id: string;
    productName: string;
    price: number;
    description: string;
    imageURL: string;
    stock: number;
    category: string;
  }) => void;
}

const EditProductForm = ({ product, setIsEditing, onUpdate }: EditProductFormProps) => {
  const [formState, setFormState] = useState({
    productName: product.productName,
    price: product.price,
    description: product.description,
    imageURL: product.imageURL,
    stock: product.stock,
    category: product.category,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting form:', formState);  
      // Send the updated product data to RestDB
      const response = await fetch(`${process.env.NEXT_PUBLIC_RESTDB_API_URL}/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': process.env.NEXT_PUBLIC_RESTDB_API_KEY as string,
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        console.error('Failed to update product');
        throw new Error('Failed to update the product');
      }

      const updatedProduct = await response.json(); // Get the updated product from the response
      console.log('Update successful', updatedProduct);

      onUpdate(updatedProduct); // Pass the updated product to the onUpdate prop

      // Show the alert after successful update
      alert('Product is updated successfully!');

      // Refresh the ProductDetails page to show updated information
      window.location.reload(); // This will reload the current page
    } catch (error) {
      console.error('Error during update:', error);
      alert('Failed to update the product. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Product Name</label>
        <input
          type="text"
          name="productName"
          value={formState.productName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formState.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Image URL</label>
        <input
          type="url"
          name="imageURL"
          value={formState.imageURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Stock</label>
        <input
          type="number"
          name="stock"
          value={formState.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Category</label>
        <input
          type="text"
          name="category"
          value={formState.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
        >
          Update Product
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
