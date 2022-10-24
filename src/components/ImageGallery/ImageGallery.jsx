import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export default function ImageGallery({ hits, openModal }) {
  return (
    <List>
      {hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            alt={tags}
            key={id}
            largeImageURL={largeImageURL}
            webformatURL={webformatURL}
            openModal={openModal}
          />
        );
      })}
    </List>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
}