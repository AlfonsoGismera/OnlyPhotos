import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logoPlaceholder from '../../assets/Logo.svg'; 

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const linkText = isHomePage ? 'Favoritos' : 'Home';
  const linkPath = isHomePage ? '/favourites' : '/';

  const tags = ['Naturaleza', 'Animales', 'Ciudades', 'Retratos', 'Abstracto'];

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <h1 className={styles.logo}>OnlyPhotos</h1>
        <img src={logoPlaceholder} alt="Logo" className={styles.logoImage} />
      </div>

      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Buscar imágenes..." className={styles.searchInput} />
        </div>
        <ul className={styles.tagsList}>
          {tags.map((tag) => (
            <li key={tag} className={styles.tagItem}>
              <button className={styles.tagButton}>{tag}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.rightSection}>
        <Link to={linkPath} className={styles.favButtonLink}>
          <button className={styles.favButton}>{linkText}</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;