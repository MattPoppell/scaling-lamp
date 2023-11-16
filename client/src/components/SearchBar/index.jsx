import React, { useState } from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <div>
      <input type="search" placeholder="Search" value={searchInput} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;