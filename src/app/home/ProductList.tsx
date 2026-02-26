// Server Component — sin 'use client', sin hooks, sin fetch propio.
// Recibe los productos ya resueltos desde page.tsx (SSR).

import Product from './Product';
import type { Product as ProductType } from '../types/product';
import '../styles/ProductList/ProductList.css';

interface ProductListProps {
  products: ProductType[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <p style={{ color: 'var(--color-glow)', padding: '2rem' }}>
        No hay productos disponibles.
      </p>
    );
  }

  return (
    <div className="product-list-wrapper">
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
