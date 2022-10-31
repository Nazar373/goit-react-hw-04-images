import React, { useState, useEffect } from 'react';
import fetchItems from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export function App() {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      try {
        fetchItems(query, page).then(resp => {
          setHits(prevState => [...prevState, ...resp.data.hits]);
          setMaxPage(Math.ceil(resp.data.totalHits / 12));
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, [page, query]);

  const openModal = img => {
    setShowModal(true);
    setLargeImage(img.largeImageURL);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const onSearchSubmit = data => {
    if (query === data) {
      return;
    }
    setQuery(data);
    setPage(1);
    setHits([]);
  };

  const onBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onSearchSubmit} />
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
      {hits.length > 0 && <ImageGallery hits={hits} openModal={openModal} />}
      <Loader isLoading={isLoading} />
      {page < maxPage && !isLoading && <Button onClick={onBtnClick} />}
    </>
  );
}
