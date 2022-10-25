import React, { Component } from 'react';
// import axios from 'axios';
import fetchItems from 'services/api';
import Searchbar from './Searchbar/Searchbar';
// import * as API from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
export class App extends Component {
  state = {
    hits: [],
    query: '',
    page: 1,
    isLoading: false,
    maxPage: 1,
    showModal: false,
    largeImage: '',
  };
  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        try {
          fetchItems(query, page).then(resp => {
            this.setState(prevState => ({
              hits: [...prevState.hits, ...resp.data.hits],
              maxPage: Math.ceil(resp.data.totalHits / 12),
            }));
          });
        } catch (err) {
          console.log(err);
        } finally {
          this.setState({ isLoading: false });
        }
      }, 1000);
    }
  }

  openModal = img => {
    this.setState(
      { showModal: true, largeImage: img.largeImageURL }
    );
  };
  closeModal = () => {
    this.setState(() => ({
      showModal: false,
    }))
  }

  onSearchSubmit = data => {
    if (this.state.query === data) {
      return;
    }
    this.setState({ query: data, page: 1, hits: [] });

  };

  onBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <img src={this.state.largeImage} alt="" />
          </Modal>
        )}
        {this.state.hits.length > 0 && (
          <ImageGallery hits={this.state.hits} openModal={this.openModal} />
        )}
        {/* <div styled={{display: flex, alignItems: center, flexDirection: column,}}> */}
        <Loader isLoading={this.state.isLoading} />
        {this.state.page < this.state.maxPage && !this.state.isLoading && (
          <Button onClick={this.onBtnClick} />
        )}
        {/* </div> */}
      </>
    );
  }
}
