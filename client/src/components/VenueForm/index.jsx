import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_VENUE } from '../../utils/mutations';
import { QUERY_VENUES, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import './VenueForm.css';

const VenueForm = () => {
  const [venueText, setVenueText] = useState('');
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
          venueAuthor: Auth.getProfile().data.username,
        },
      });
      setVenueText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'venueText' && value.length <= 280) {
      setVenueText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="venue-form-container">
      <h3 className="mb-4 font-bold text-lg text-blue-700">
        Do you want to see or add a venue?
      </h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`mb-2 ${
              characterCount === 280 || error ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form onSubmit={handleFormSubmit}>
            <textarea
              name="venueText"
              placeholder="Here's a new venue..."
              value={venueText}
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              type="submit"
            >
              Add Venue
            </button>
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
