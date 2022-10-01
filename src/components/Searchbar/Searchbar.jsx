import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import st from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [inputSearch, setInputSearch] = useState('');

  const handleInputChange = e => {
    setInputSearch(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputSearch.trim() === '') {
      toast.warn('You should to write something to search');
      return;
    }
    onSubmit(inputSearch.trim());
  };
  return (
    <header className={st.Searchbar}>
      <form className={st.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={st.SearchForm_button}
          style={{ fontSize: 30 }}
        >
          <FcSearch />
          <span className={st.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={st.SearchForm_input}
          type="text"
          value={inputSearch}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
      <ToastContainer />
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
