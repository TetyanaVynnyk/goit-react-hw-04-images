import { useState, useEffect, useCallback } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from './Modal';
import Button from './Button';
import Spinner from './Loader';

import SearchForm from './Searchform';
import ImageGallery from './ImageGallery';
import BigImage from './ImageGallery/BigImage';

import { searchImages } from 'shared/services/images-api';

import styles from './searchbar.module.css';

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await searchImages(search, page);
        const { hits, totalHits } = data;
        setItems(prevItems => [...prevItems, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [search, page, setLoading, setItems, setTotalHits, setError]);

  const notify = () => toast('You have not entered a request');

  const onSearchImages = useCallback(({ search }) => {
    if (search.trim() === '') {
      return notify();
    }
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const showBigImage = useCallback(({ largeImageURL, tags }) => {
    setBigImg({ largeImageURL, tags });
    setShowModal(true);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setBigImg(null);
  }, []);

  return (
    <>
      <SearchForm onSubmit={onSearchImages} />
      <ImageGallery items={items} showImages={showBigImage} />
      {!items.length && search && !loading && (
        <p className={styles.message}>Oops... Images not found</p>
      )}
      {error && <p>{error}</p>}
      {loading && <Spinner />}
      {Boolean(items.length) && items.length < totalHits && (
        <Button loadMore={loadMore}>Load more</Button>
      )}
      {showModal && (
        <Modal close={closeModal}>
          <BigImage {...bigImg} />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};

export default Searchbar;
