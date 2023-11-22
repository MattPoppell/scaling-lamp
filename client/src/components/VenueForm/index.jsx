import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_VENUE } from '../../utils/mutations';
import { QUERY_VENUES, QUERY_ME } from '../../utils/queries';
import './VenueForm.css';
import FindVenue from '../FindVenue/FindVenue';

const VenueForm = () => {
  const [venueName, setVenueName] = useState('');
  const [venueState, setVenueState] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [venueCapacity, setVenueCapacity] = useState('');
  const [venueCatering, setVenueCatering] = useState(false);
  const [venueBarsNearby, setVenueBarsNearby] = useState(false);
  const [preferredGenre, setPreferredGenre] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [showVenueForm, setShowVenueForm] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const [addVenue, { error }] = useMutation(ADD_VENUE, {
    refetchQueries: [
      { query: QUERY_VENUES },
      { query: QUERY_ME },
    ],
  });

  const handleAddVenueClick = () => {
    setShowVenueForm(true);
    setShowButtons(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await addVenue({
        variables: {
          name: venueName,
          city: venueCity,
          state: venueState,
          capacity: venueCapacity,
          preferredGenre: preferredGenre,
          catering: venueCatering,
          barsNearby: venueBarsNearby,
          comments: []
        },
      });
      const { data } = result;


      setVenueName('');
      setVenueState('');
      setVenueCity('');
      setVenueCapacity('');
      setVenueCatering(false);
      setVenueBarsNearby(false);
      setPreferredGenre('');
      setShowVenueForm(false); // Hide form after submission
      setShowButtons(true); // Show the buttons again after submission
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Handle checkbox change
    if (type === 'checkbox') {
      if (name === 'venueCatering') {
        setVenueCatering(checked);
      } else if (name === 'venueBarsNearby') {
        setVenueBarsNearby(checked);
      }
    } else {
      // Handle other input changes
      if (name === 'venueName' || name === 'venueCity') {
        // Limit character count for certain fields if needed
        if (value.length <= 280) {
          if (name === 'venueName') setVenueName(value);
          else if (name === 'venueCity') setVenueCity(value);
          setCharacterCount(value.length);
        }
      } else if (name === 'venueCapacity') {

        setVenueCapacity(value);
      } else if (name === 'venueState') {
        setVenueState(value);
      } else if (name === 'preferredGenre') {
        setPreferredGenre(value);
      }
    }
  };
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
    'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];


  return (
    <div className="venue-form-container">
      <h3 className="mb-4 font-bold text-lg text-blue-700">
        Do you want to see or add a venue?
      </h3>

      {/* Add Venue and Find Venue buttons */}
      {showButtons && (
        <div className="button-container flex space-x-4 mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md submit-btn"
            onClick={handleAddVenueClick}
          >
            Add Venue
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md submit-btn"
            onClick={FindVenue}
          >
            Find Venue
          </button>
        </div>
      )}


      {showVenueForm && (
        <form onSubmit={handleFormSubmit}>
          {/* Venue Form */}
          {showVenueForm && (
            <textarea
              name="venueName"
              placeholder="Enter venue name..."
              value={venueName}
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>

          )/* Character count limit */}
          <p className={`mb-2 ${characterCount === 280 || error ? 'text-red-500' : 'text-gray-500'}`}>
            Character Count: {characterCount}/280
          </p>

          {/* State dropdown list */}
          <div className="mb-4">
            <label htmlFor="venueState" className="block text-gray-700">State: </label>
            <select
              id="venueState"
              name="venueState"
              value={venueState}
              onChange={handleChange}
              className="form-select w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            >
              <option value="" key="default">
                Select a State
              </option>
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

          </div>

          {/* Input fields for city, capacity, catering, barsNearby */}
          <div className="mb-4">
            <label htmlFor="venueCity" className="block text-gray-700">City: </label>
            <input
              type="text"
              id="venueCity"
              name="venueCity"
              value={venueCity}
              onChange={handleChange}
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="venueCapacity" className="block text-gray-700">Capacity: </label>
            <input
              type="text"
              id="venueCapacity"
              name="venueCapacity"
              value={venueCapacity}
              onChange={handleChange}
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preferredGenre" className="block text-gray-700">Preferred Genre: </label>
            <input
              type="text"
              id="preferredGenre"
              name="preferredGenre"
              value={preferredGenre}
              onChange={handleChange}
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="venueCatering" className="block text-gray-700">
              Catering:
              <input
                type="checkbox"
                id="venueCatering"
                name="venueCatering"
                checked={venueCatering}
                onChange={handleChange}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="venueBarsNearby" className="block text-gray-700">
              Bars Nearby:
              <input
                type="checkbox"
                id="venueBarsNearby"
                name="venueBarsNearby"
                checked={venueBarsNearby}
                onChange={handleChange}
                className="ml-2"
              />
            </label>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md submit-btn"
            type="submit"
          >
            Submit Venue
          </button>

        </form>
      )}

      {error && (
        <div className="text-white bg-red-500 py-2 px-4 rounded-md mt-4">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default VenueForm;
