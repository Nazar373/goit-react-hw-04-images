import PropTypes from 'prop-types';

import { Item, Img } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ webformatURL, openModal, largeImageURL}) {
  return (
    <Item onClick={() => {openModal({largeImageURL})}}>
      <Img src={webformatURL} alt=""/>
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}