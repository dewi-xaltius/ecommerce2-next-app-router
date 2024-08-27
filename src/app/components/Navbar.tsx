import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-orange-500 text-white p-4">
      <div className="container mx-auto flex justify-center space-x-40">
        <Link href="/" className="text-lg font-semibold hover:text-xl transition duration-300">
          Home
        </Link>
        <Link href="/add-product" className="text-lg font-semibold hover:text-xl transition duration-300">
          Add Product
        </Link>
        <Link href="/check-inventory" className="text-lg font-semibold hover:text-xl transition duration-300">
          Check Inventory
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
