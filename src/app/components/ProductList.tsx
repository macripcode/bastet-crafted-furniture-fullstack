'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Product from './Product';
import { fetchProducts } from '../services/products';
import type { Product as ProductType } from '../types/product';
import '../styles/ProductList/ProductList.css';

interface ProductListProps {
  itemsPerPage?: number;
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  onCategoriesLoaded?: (categories: string[]) => void;
}

function ProductList({
  itemsPerPage = 8,
  selectedCategory,
  minPrice,
  maxPrice,
  sortBy,
  onCategoriesLoaded,
}: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products = [], isLoading, error } = useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (products.length > 0) {
      onCategoriesLoaded?.([...new Set(products.map((p) => p.category))]);
    }
  }, [products, onCategoriesLoaded]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, minPrice, maxPrice, sortBy]);

  const filtered = useMemo(() =>
    products
      .filter((p) => selectedCategory === '' || p.category === selectedCategory)
      .filter((p) => minPrice === 0 || p.price >= minPrice)
      .filter((p) => maxPrice === 0 || p.price <= maxPrice)
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
        return 0;
      }),
    [products, selectedCategory, minPrice, maxPrice, sortBy]
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentProducts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  }, [totalPages]);

  if (isLoading) {
    return <p style={{ color: 'var(--color-glow)', padding: '2rem' }}>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ color: 'var(--color-gold-medium)', padding: '2rem' }}>{error.message}</p>;
  }

  return (
    <div className="product-list-wrapper">
      <div className="product-list">
        {currentProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'pagination-btn--active' : ''}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
