import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-orange-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="text-lg font-semibold hover:text-orange-200">
            Home
          </Link>
          <Link href="/add-product" className="text-lg font-semibold hover:text-orange-200">
            Add Product
          </Link>
          <Link href="/check-inventory" className="text-lg font-semibold hover:text-orange-200">
            Check Inventory
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
