import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Importa useSelector si necesitas el estado de la búsqueda
import styles from './Header.module.scss';
import logoPlaceholder from '../../assets/Logo.png';
import fondo_error from '../../assets/fondo_error.jpg';
import { getRandomUnsplashImage } from '../../services/unsplashService';
import { fetchImages } from '../../redux/gallerySlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de check

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

  // Estado para almacenar la etiqueta activa
  const [activeTag, setActiveTag] = useState(null);

  // Si necesitas acceder al último tag buscado desde Redux:
  // const lastSearchedTag = useSelector(state => state.gallery.searchTerm);

  useEffect(() => {
    const fetchHeaderImage = async () => {
      try {
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
    // Si quieres que la etiqueta activa se mantenga al volver a la página principal
    // setActiveTag(lastSearchedTag);
  }, [isHomePage /*, lastSearchedTag */]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(fetchImages({ tag: searchQuery, reset: true }));
      setActiveTag(searchQuery.trim()); // Actualiza la etiqueta activa
    } else {
      setActiveTag(null); // Limpia la etiqueta activa si la búsqueda está vacía
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleTagClick = (tag) => {
    dispatch(fetchImages({ tag, reset: true }));
    setActiveTag(tag); // Actualiza la etiqueta activa
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
                  {activeTag === tag && (
                    <FontAwesomeIcon icon={faCheck} className={styles.activeTagIcon} />
                  )}
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