'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Filter from './components/Filter';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';

const slides = [
  { id: 1, image_url: '/slider/slide1.jpg', title: 'Mesa Artesanal', subtitle: 'Madera de roble macizo' },
  { id: 2, image_url: '/slider/slide2.jpg', title: 'Silla Colonial', subtitle: 'Diseño clásico, confort moderno' },
  { id: 3, image_url: '/slider/slide3.jpg', title: 'Vitrina Elegante', subtitle: 'Exhibe lo que más valoras' },
];

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortBy, setSortBy] = useState('');

  return (
    <>
      <Navbar />
      <Slider slides={slides} />
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ProductList
        itemsPerPage={8}
        selectedCategory={selectedCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        sortBy={sortBy}
        onCategoriesLoaded={setCategories}
      />
      <AboutUs />
    </>
  );
}
