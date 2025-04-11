import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmModal.module.scss';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          <button className={styles.confirmButton} onClick={onConfirm}>Sí</button>
          <button className={styles.cancelButton} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ConfirmModal;
