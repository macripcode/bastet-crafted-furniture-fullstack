'use client';

import '../styles/Filter/Filter.css';

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

function Filter({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sortBy,
  onSortChange,
}: FilterProps) {
  return (
    <aside className="filter">
      <div className="filter-group">
        <h3 className="filter-label">Categoría</h3>
        <ul className="filter-list">
          <li>
            <button
              className={`filter-option ${selectedCategory === '' ? 'filter-option--active' : ''}`}
              onClick={() => onCategoryChange('')}
            >
              Todas
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`filter-option ${selectedCategory === cat ? 'filter-option--active' : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-group">
        <h3 className="filter-label">Precio</h3>
        <div className="filter-price">
          <div className="filter-price-field">
            <span className="filter-price-sign">$</span>
            <input
              type="number"
              className="filter-price-input"
              placeholder="Mín"
              value={minPrice || ''}
              min={0}
              onChange={(e) => onMinPriceChange(Number(e.target.value))}
            />
          </div>
          <span className="filter-price-separator">—</span>
          <div className="filter-price-field">
            <span className="filter-price-sign">$</span>
            <input
              type="number"
              className="filter-price-input"
              placeholder="Máx"
              value={maxPrice || ''}
              min={0}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-label">Ordenar por</h3>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Relevancia</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
          <option value="name_asc">Nombre: A - Z</option>
          <option value="name_desc">Nombre: Z - A</option>
        </select>
      </div>
    </aside>
  );
}

export default Filter;
