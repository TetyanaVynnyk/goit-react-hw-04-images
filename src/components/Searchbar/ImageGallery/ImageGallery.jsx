import PropTypes from 'prop-types';

import { memo } from "react";

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import styles from './image-gallery.module.css';

const ImageGallery = ({ items, showImages }) => {
  return (
    <ul className={styles.gallery}>
      <ImageGalleryItem items={items} showImages={showImages} />
    </ul>
  );
};

export default memo(ImageGallery);

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showImages: PropTypes.func.isRequired,
};
