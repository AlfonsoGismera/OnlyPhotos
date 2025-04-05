import React from 'react';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const DownloadButton = ({ imageUrl, filename = 'imagen.jpg' }) => {
  const handleDownload = () => {
    saveAs(imageUrl, filename);
  };

  return (
    <button className="download-button" onClick={handleDownload}>
       <FontAwesomeIcon icon={faDownload} />
    </button>
  );
};

export default DownloadButton;