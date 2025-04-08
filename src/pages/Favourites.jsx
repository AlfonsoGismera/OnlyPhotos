import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageCard from '../components/imageCard/ImageCard';
import { updateFavouriteDescription, removeFavourite } from '../features/favourites/favouritesSlice';
// import './Favourites.scss'; 

function Favourites() {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favourites.favourites);

  const handleDescriptionSave = (newDesc, imageId) => {
    dispatch(updateFavouriteDescription({ id: imageId, description: newDesc }));
  };

  return (
    <div className="favourites-page">
      <h1>Página de Favoritos</h1>
      {favourites.length > 0 ? (
        <div className="favourites-gallery">
          {favourites.map(img => (
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
    </div>
  );
}

export default Favourites;
