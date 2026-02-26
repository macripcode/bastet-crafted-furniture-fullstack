// Server Component — SSR por request.
// Para ISR, descomenta la siguiente línea y elimina los cache: 'no-store':
// export const revalidate = 60;

import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import SliderClient, { type Banner } from '../components/SliderClient';
import Filter from '../components/Filter';
import ProductList from '../components/ProductList';
import AboutUs from '../components/AboutUs';
import type { Product } from '../types/product';

export const metadata: Metadata = {
  title: 'Bastet Crafted Furniture | Muebles Artesanales Únicos',
  description:
    'Descubrí nuestra colección de muebles artesanales elaborados a mano con maderas nobles y materiales de la más alta calidad. Elegancia atemporal para tu hogar.',
  openGraph: {
    title: 'Bastet Crafted Furniture',
    description: 'Muebles artesanales únicos, elaborados con maderas nobles.',
    type: 'website',
  },
};

async function getBanners(): Promise<Banner[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${process.env.API_SECRET_TOKEN}` },
  });

  if (!res.ok) return [];
  return res.json();
}

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?featured=true`,
    {
      cache: 'no-store',
      headers: { Authorization: `Bearer ${process.env.API_SECRET_TOKEN}` },
    }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const [banners, products] = await Promise.all([
    getBanners(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Navbar />
      <SliderClient banners={banners} />
      {/* Filter es Client Component — conectarlo requiere mover el estado a un wrapper client */}
      {/* <Filter ... /> */}
      <ProductList products={products} />
      <AboutUs />
    </>
  );
}
