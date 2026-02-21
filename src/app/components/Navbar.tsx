'use client';

import Logo from './Logo';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import '../styles/Navbar/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Logo />
      </div>

      <ul className="navbar-center">
        <li>
          <a href="#about" className="navbar-link title">Acerca de Nosotros</a>
        </li>
        <li>
          <a href="#categories" className="navbar-link title">Categorías</a>
        </li>
      </ul>

      <div className="navbar-right">
        <button className="navbar-icon" aria-label="Buscar"><SearchOutlinedIcon /></button>
        <button className="navbar-icon" aria-label="Carrito"><ShoppingCartOutlinedIcon /></button>
        <button className="navbar-icon" aria-label="Cuenta"><PersonOutlinedIcon /></button>
      </div>
    </nav>
  );
}

export default Navbar;
