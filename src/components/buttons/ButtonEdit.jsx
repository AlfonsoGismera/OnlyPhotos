import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ onClick }) => {
  return (
    <button className="edit-button" onClick={onClick}>
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
};

export default LikeButton;