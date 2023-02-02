import PropTypes from 'prop-types';

const BigImage = ({ largeImageURL, tags }) => {
  return (
      <img
        src={largeImageURL}
        alt={tags}
      />
  );
};

export default BigImage;

BigImage.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
