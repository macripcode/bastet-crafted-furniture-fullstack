import type { Measures } from '../types/product';
import '../styles/Product/Product.css';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  description: string;
  characteristics: string[];
  materials: string[];
  measures: Measures;
}

function Product({ id, name, price, stock, image_url, category, description, characteristics, materials, measures }: ProductProps) {
  const measuresDisplay = `${measures.width_cm} x ${measures.height_cm} x ${measures.depth_cm} cm${measures.weight_kg ? ` · ${measures.weight_kg} kg` : ''}`;

  return (
    <div className="product" key={id}>
      <div className="product-image-wrapper">
        <img src={image_url} alt={name} className="product-image" />
        <span className="product-category">{category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
        <p className="product-stock">{stock > 0 ? `${stock} en stock` : 'Sin stock'}</p>
        <p className="product-description">{description}</p>

        <div className="product-details">
          <div className="product-detail">
            <span className="product-detail-label">Materiales</span>
            <ul className="product-detail-list">
              {materials.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>

          <div className="product-detail">
            <span className="product-detail-label">Características</span>
            <ul className="product-detail-list">
              {characteristics.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>

          <div className="product-detail">
            <span className="product-detail-label">Medidas</span>
            <span className="product-detail-value">{measuresDisplay}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
