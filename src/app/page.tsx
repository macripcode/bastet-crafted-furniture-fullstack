// Server Component — se ejecuta en el servidor en cada request.
//
// Para cambiar a ISR y revalidar cada 60 s, descomenta la línea siguiente
// y elimina los `cache: 'no-store'` de las funciones de fetch:
// export const revalidate = 60;

import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import SliderClient, { type Banner } from './components/SliderClient';
import ProductList from './components/ProductList';
import AboutUs from './components/AboutUs';
import type { Product } from './types/product';

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

export default async function Home() {
  // Ambas requests corren en paralelo en el servidor
  const [banners, products] = await Promise.all([
    getBanners(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Navbar />
      {/* Client Component: recibe banners ya resueltos como prop serializable */}
      <SliderClient banners={banners} />
      {/* Server Component: renderiza el HTML de los productos directamente */}
      <ProductList products={products} />
      <AboutUs />
    </>
  );
}
