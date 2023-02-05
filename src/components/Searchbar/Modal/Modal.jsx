import { useEffect, useCallback } from 'react';

import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]).isRequired
};
