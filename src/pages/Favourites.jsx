import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageCard from '../components/imageCard/ImageCard';
import ConfirmModal from '../components/Modals/ConfirmModal';
import { updateFavouriteDescription, removeFavourite, clearFavourites } from '../redux/favouritesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Favourites() {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favourites.favourites);
  // Estado para mostrar el modal de confirmación
  const [showConfirmModal, setShowConfirmModal] = useState(false);
    // Función para borrar todos los favoritos
    const handleClearAll = () => {
      setShowConfirmModal(true);
    };
  
    const confirmClearAll = () => {
      dispatch(clearFavourites());
      setShowConfirmModal(false);
      console.log("Todos los favoritos fueron eliminados.");
    };

  // Estados para criterio de orden y dirección
  const [sortCriterion, setSortCriterion] = useState(null); // 'likes', 'date', 'width', 'height'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' o 'desc'

  // Función que cambia el criterio de orden y alterna la dirección si es el mismo
  const handleSort = (criterion) => {
    if (sortCriterion === criterion) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriterion(criterion);
      setSortOrder('asc');
    }
  };

  // Uso de useMemo para ordenar las imágenes sin recalcular en cada render si no cambian los dependientes
  const sortedFavorites = useMemo(() => {
    if (!sortCriterion) return favourites;
    const sorted = [...favourites].sort((a, b) => {
      let aValue, bValue;
      switch (sortCriterion) {
        case 'likes':
          aValue = a.likes || 0;
          bValue = b.likes || 0;
          break;
        case 'date':
          // Convertir fechas a números para comparar
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case 'width':
          aValue = a.width || 0;
          bValue = b.width || 0;
          break;
        case 'height':
          aValue = a.height || 0;
          bValue = b.height || 0;
          break;
        default:
          aValue = 0;
          bValue = 0;
      }
      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [favourites, sortCriterion, sortOrder]);

  const handleDescriptionSave = (newDesc, imageId) => {
    dispatch(updateFavouriteDescription({ id: imageId, description: newDesc }));
  };

  return (
    <div className="favourites-page">
      <h1>Página de Favoritos</h1>
      {/* Botones de ordenación */}
      <div className="sortButtons">
        <button onClick={() => handleSort('likes')}>
          Likes {sortCriterion === 'likes' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('date')}>
          Date {sortCriterion === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('width')}>
          Width {sortCriterion === 'width' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('height')}>
          Height {sortCriterion === 'height' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button className="clearButton" onClick={handleClearAll}>
          <FontAwesomeIcon icon={faTrash} /></button>
      </div>

      {sortedFavorites.length > 0 ? (
        <div className="favourites-gallery">
          {sortedFavorites.map(img => (
            <ImageCard
              key={img.id}
              img={img}
              isFavourite={true}
              onDescriptionSave={handleDescriptionSave}
            />
          ))}
        </div>
      ) : (
        <p>No hay imágenes favoritas.</p>
      )}

      <div id="modal-root"></div>
       {/* Modal de confirmación */}
       {showConfirmModal && (
        <ConfirmModal
          message="¿Estás seguro que quieres borrar todas las imágenes?"
          onConfirm={confirmClearAll}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}

export default Favourites;
