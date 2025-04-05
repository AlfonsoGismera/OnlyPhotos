import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ onClick }) => {
  return (
    <button className="like-button" onClick={onClick}>
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
};

export default LikeButton;