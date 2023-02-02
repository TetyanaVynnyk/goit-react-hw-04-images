import PropTypes from 'prop-types';

import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ items, showImages }) => {
  return items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li
      onClick={() => showImages({ largeImageURL, tags })}
      key={id}
      className={styles.galleryItem}
    >
      <img src={webformatURL} alt={tags} className={styles.image} />
    </li>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  items: [],
};

ImageGalleryItem.propTypes = {
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
