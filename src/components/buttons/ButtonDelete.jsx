import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteButton = ({ onClick }) => (
  <button className="delete-button" onClick={onClick}>
    <FontAwesomeIcon icon={faTrash} />
  </button>
);

export default DeleteButton;
