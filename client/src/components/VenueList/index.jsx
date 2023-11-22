import React from 'react';
import PropTypes from 'prop-types';
import './VenueList.css';
import { Link } from 'react-router-dom';
const VenueList = ({ venues }) => {
  if (!venues || !venues.length) {
    return <p>No venues found.</p>;
  }

  return (
    <div className="venue-list">
      {venues.map((venue, index) => {

        return (
          <div key={venue._id || index} className='venue'>
            <p>Name: {venue.name}</p>
            <p>State: {venue.state}</p>
            <p>City: {venue.city}</p>
            <Link to={`/venue/${venue._id}`}>
              <button className="submit-btn" onClick={() => console.log('Clicked:', venue._id)}>Take a closer look at this Venue</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};


VenueList.propTypes = {
  venues: PropTypes.arrayOf(
    PropTypes.shape({
      // id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      capacity: PropTypes.string.isRequired,
      // preferredGenre: PropTypes.string.isRequired,
      catering: PropTypes.bool.isRequired,
      barsNearby: PropTypes.bool.isRequired,
    })
  )//.isRequired,
};

export default VenueList;