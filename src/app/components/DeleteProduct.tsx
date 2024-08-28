// src/app/components/DeleteProduct.tsx
import { useRouter } from 'next/navigation';

interface DeleteProductProps {
  productId: string;
}

const DeleteProduct = ({ productId }: DeleteProductProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_RESTDB_API_URL}/${productId}`, {
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

  return (
    <button
      onClick={handleDelete}
      className="self-end bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
    >
      Delete Product
    </button>
  );
};

export default DeleteProduct;
