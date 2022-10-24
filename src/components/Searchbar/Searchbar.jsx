import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    name: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name.trim() === '') {
      alert('Please , enter a name');
    }
    this.props.onSubmit(this.state.name);
    this.reset();
  }

  reset = () => {
    this.setState({ name: '' });
  };

  onChangeInput = e => {
    this.setState({ name: e.currentTarget.value });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            value={this.state.name}
            type="text"
            autocomplete="off"
            onChange={this.onChangeInput}
            // autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  
}