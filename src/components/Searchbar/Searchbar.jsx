import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({onSubmit}) {

  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Please , enter a name');
    }
    onSubmit(name);
    reset();
  };

  const reset = () => {
    setName('');
  };

  const onChangeInput = e => {
    setName(e.currentTarget.value);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          value={name}
          type="text"
          autocomplete="off"
          onChange={onChangeInput}
          // autofocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
