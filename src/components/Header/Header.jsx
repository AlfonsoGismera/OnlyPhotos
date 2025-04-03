import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import logoPlaceholder from '../../assets/Logo.png';
import fondo_error from '../../assets/fondo_error.jpg';
import { getRandomUnsplashImage } from '../../services/unsplashService';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const linkText = isHomePage ? 'Favoritos ❣️' : 'Home 🏠';
  const linkPath = isHomePage ? '/favourites' : '/';
  const tags = ['Naturaleza', 'Animales', 'Ciudades', 'Retratos', 'Abstracto'];
  const [headerBackground, setHeaderBackground] = useState('');

  useEffect(() => {
    // Comentamos la llamada a fetchImage para deshabilitar la función para no gastar recursos innecesarios mientras se desarrolla la app
    // const fetchImage = async () => {
    //   try {
    //     const imageUrl = await getRandomUnsplashImage();
    //     if (imageUrl) {
    //       setHeaderBackground(`url(${imageUrl})`);
    //     } else {
    //       setHeaderBackground(`url(${fondo_error})`);
    //     }
    //   } catch (error) {
    //     console.error('Error al obtener la imagen de Unsplash:', error);
    //     setHeaderBackground(`url(${fondo_error})`);
    //   }
    // };

    // fetchImage(); // Deshabilitado
    setHeaderBackground(`url(${fondo_error})`); // Establecemos la imagen de respaldo por defecto
  }, []);

  return (
    <header className={styles.header} style={{ backgroundImage: headerBackground }}>
      <div className={styles.leftSection}>
        <h1 className={styles.logo}>OnlyPhotos</h1>
        <img src={logoPlaceholder} alt="Logo" className={styles.logoImage} />
      </div>

      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar imágenes...🔎"
            className={styles.searchInput}
          />
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