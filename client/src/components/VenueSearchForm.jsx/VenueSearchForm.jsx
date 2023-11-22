import React, { useState } from 'react';

const VenueSearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    state: '',
    city: '',
    capacity: '',
    preferredGenre: '',
    catering: false,
    barsNearby: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSearch = () => {
    onSearch(searchCriteria);
  };

  return (
    <div className="venue-search-form">
      <h3 className="mb-4 font-bold text-lg text-blue-700">Find a Venue</h3>
      <form>
        <div className="mb-4">
          <label htmlFor="searchName" className="block text-gray-700">Name: </label>
          <input
            type="text"
            id="searchName"
            name="name"
            value={searchCriteria.name}
            onChange={handleChange}
            className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="searchState" className="block text-gray-700">State: </label>
          <input
            type="text"
            id="searchState"
            name="state"
            value={searchCriteria.state}
            onChange={handleChange}
            className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="searchCity" className="block text-gray-700">City: </label>
          <input
            type="text"
            id="searchCity"
            name="city"
            value={searchCriteria.city}
            onChange={handleChange}
            className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="searchCapacity" className="block text-gray-700">Capacity: </label>
          <input
            type="text"
            id="searchCapacity"
            name="capacity"
            value={searchCriteria.capacity}
            onChange={handleChange}
            className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="searchPreferredGenre" className="block text-gray-700">Preferred Genre: </label>
          <input
            type="text"
            id="searchPreferredGenre"
            name="preferredGenre"
            value={searchCriteria.preferredGenre}
            onChange={handleChange}
            className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="searchCatering" className="block text-gray-700">
            Catering:
            <input
              type="checkbox"
              id="searchCatering"
              name="catering"
              checked={searchCriteria.catering}
              onChange={handleChange}
              className="ml-2"
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="searchBarsNearby" className="block text-gray-700">
            Bars Nearby:
            <input
              type="checkbox"
              id="searchBarsNearby"
              name="barsNearby"
              checked={searchCriteria.barsNearby}
              onChange={handleChange}
              className="ml-2"
            />
          </label>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md submit-btn"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default VenueSearchForm;
