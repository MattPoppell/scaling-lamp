import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_VENUE } from '../../utils/mutations';
import { QUERY_VENUES, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import './VenueForm.css';

const VenueForm = () => {
  const [venueText, setVenueText] = useState('');
  const [venueState, setVenueState] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [venueCapacity, setVenueCapacity] = useState('');
  const [venueCatering, setVenueCatering] = useState(false);
  const [venueBarsNearby, setVenueBarsNearby] = useState(false);
  const [preferredGenre, setPreferredGenre] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addVenue, { error }] = useMutation(ADD_VENUE, {
    refetchQueries: [QUERY_VENUES, 'getVENUES', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addVenue({
        variables: {
          venueText,
          venueState,
          venueCity,
          venueCapacity: parseInt(venueCapacity),
          venueCatering,
          venueBarsNearby,
          preferredGenre,
          venueAuthor: Auth.getProfile().data.username,
        },
      });

      // Reset form fields after submission
      setVenueText('');
      setVenueState('');
      setVenueCity('');
      setVenueCapacity('');
      setVenueCatering(false);
      setVenueBarsNearby(false);
      setPreferredGenre('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      if (name === 'venueCatering') {
        setVenueCatering(checked);
      } else if (name === 'venueBarsNearby') {
        setVenueBarsNearby(checked);
      }
    } else {

      if (name === 'venueText' || name === 'venueCity') {
        // Limit character count for certain fields if needed
        if (value.length <= 280) {
          if (name === 'venueText') setVenueText(value);
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

      {Auth.loggedIn() ? (
        <>
          {/* Input field for name */}
          <form onSubmit={handleFormSubmit}>
            <textarea
              name="venueText"
              placeholder="Enter venue name..."
              value={venueText}
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>

            {/* Character count limit */}
            <p className={`mb-2 ${characterCount === 280 || error ? 'text-red-500' : 'text-gray-500'}`}>
              Character Count: {characterCount}/280
            </p>

            {/* state dropdown list */}
            <div className="mb-4">
              <label htmlFor="venueState" className="block text-gray-700">State: </label>
              <select
                id="venueState"
                name="venueState"
                value={venueState}
                onChange={handleChange}
                className="form-select w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
              >
                <option value="">Select a State</option>
                {usStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Input fields for city, capacting, catering, barsNearby */}
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

            {/* Submit button */}
            <div className="button-container flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md submit-btn"
                type="submit"
              >
                Add Venue
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md submit-btn"
                type="button"
              >
                Find Venue
              </button>
            </div>
          </form>

          {error && (
            <div className="text-white bg-red-500 py-2 px-4 rounded-md mt-4">
              {error.message}
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">
          You need to be logged in to see the Venue. Please{' '}
          <Link to="/login" className="text-blue-500">
            login
          </Link>{' '}
          or{' '}
          <Link to="/signup" className="text-blue-500">
            signup
          </Link>
          .
        </p>
      )}
    </div>
  );
};

export default VenueForm;
