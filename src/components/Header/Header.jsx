import React, { useState, useEffect } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Header.module.scss';
import logoPlaceholder from '../../assets/Logo.png';
import fondo_error from '../../assets/fondo_error.jpg';
import { getRandomUnsplashImage } from '../../services/unsplashService';
import { fetchImages } from '../../redux/gallerySlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const linkText = isHomePage ? 'Favoritos ❣️' : 'Home 🏠';
  const linkPath = isHomePage ? '/favourites' : '/';
  
  // Tags predefinidos para búsquedas rápidas
  const tags = ['Naturaleza', 'Animales', 'Ciudades', 'Retratos', 'Abstracto'];
  const [headerBackground, setHeaderBackground] = useState('');
  
  // Estado para el input de búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHeaderImage = async () => {
      try {
        // Usa distintos query según la ruta para evitar que sean iguales
        const query = isHomePage ? 'Naturaleza' : 'Cats';
        const images = await getRandomUnsplashImage(query);
        if (images && images.length > 0) {
          setHeaderBackground(`url(${images[0].urls.full})`);
        } else {
          setHeaderBackground(`url(${fondo_error})`);
        }
      } catch (error) {
        console.error('Error al obtener la imagen de Unsplash:', error);
        setHeaderBackground(`url(${fondo_error})`);
      }
    };

    fetchHeaderImage();
  }, [isHomePage]);
  
  // Función para disparar la búsqueda desde el input
  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(fetchImages({ tag: searchQuery, reset: true }));
    }
  };

  // Dispara la búsqueda cuando el usuario presiona Enter en el input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Función para buscar por tag cuando se hace clic en un botón de etiqueta
  const handleTagClick = (tag) => {
    dispatch(fetchImages({ tag, reset: true }));
  };

  return (
    <header className={styles.header} style={{ backgroundImage: headerBackground }}>
      <div className={styles.leftSection}>
        <h1 className={styles.logo}>OnlyPhotos</h1>
        <img src={logoPlaceholder} alt="Logo" className={styles.logoImage} />
      </div>

      {isHomePage && (
        <div className={styles.centerSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar imágenes... 🔎"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>   
          <ul className={styles.tagsList}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tagItem}>
                <button
                  className={styles.tagButton}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.rightSection}>
        <Link to={linkPath} className={styles.favButtonLink}>
          <button className={styles.favButton}>{linkText}</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
