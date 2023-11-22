import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_VENUES, QUERY_SINGLE_VENUE_CITY, QUERY_SINGLE_VENUE_ID, QUERY_SINGLE_VENUE_STATE, QUERY_SINGLE_VENUE_NAME, QUERY_SINGLE_VENUE_GENRE, QUERY_SINGLE_VENUE_FOOD  } from '../../utils/queries';

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [capacityInput, setCapacityInput] = useState('');
  const [preferredGenreInput, setPreferredGenreInput] = useState('');
  const [cateringInput, setCateringInput] = useState('');
  const [barsNearbyInput, setBarsNearbyInput] = useState('');
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showButtons, setShowButtons] = useState(true);


  // You can use the SEARCH_VENUES query to fetch the results based on the search criteria
  const { loading, error, data } = useQuery(QUERY_VENUES, {
    variables: {
      name: searchInput,
      city: cityInput,
      state: stateInput,
      capacity: capacityInput,
      preferredGenre: preferredGenreInput,
      catering: cateringInput,
      barsNearby: barsNearbyInput,

    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearchForm(true);
    setShowButtons(false);
    // Perform the search with the provided criteria
    // You can use the data returned by the query for rendering the search results
    console.log('Performing search...');
  };

  return (
    <div>
      <h3>Search Venues</h3>
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="searchInput">Venue Name:</label>
          <input
            type="text"
            id="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cityInput">City:</label>
          <input
            type="text"
            id="cityInput"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stateInput">State:</label>
          <input
            type="text"
            id="stateInput"
            value={stateInput}
            onChange={(e) => setStateInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="capacityInput">Capacity:</label>
          <input
            type="text"
            id="capacityInput"
            value={capacityInput}
            onChange={(e) => setCapacityInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="preferredGenreInput">Preferred Genres:</label>
          <input
            type="text"
            id="preferredGenreInput"
            value={preferredGenreInput}
            onChange={(e) => setPreferredGenreInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cateringInput">Food Options</label>
          <input
            type="checkbox"
            id="cateringInput"
            value={cateringInput}
            onChange={(e) => setCateringInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="barsNearbyInput">Bars Nearby? </label>
          <input
            type="checkbox"
            id="barsNearbyInput"
            value={barsNearbyInput}
            onChange={(e) => setBarsNearbyInput(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {/* Render search results from 'data' */}
      {data && (
        <div>
          <h4>Search Results</h4>
          {}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
