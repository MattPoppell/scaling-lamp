import React from 'react';
import PropTypes from 'prop-types';
import './VenueList.css';

const VenueList = ({ venues }) => {
  if (!venues || !venues.length) {
    return <p>No venues found.</p>;
  }

  return (
    <div className="venue-list">
      {venues.map((venue) => (
        <div key={venue.id}>
          <p>Name: {venue.name}</p>
          <p>State: {venue.state}</p>
          <p>City: {venue.city}</p>
          <p>Capacity: {venue.capacity}</p>
          <p>Preferred Genre: {venue.preferredGenre}</p>
          <p>Catering: {venue.catering ? 'Yes' : 'No'}</p>
          <p>Bars Nearby: {venue.barsNearby ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

VenueList.propTypes = {
  venues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired,
      preferredGenre: PropTypes.string.isRequired,
      catering: PropTypes.bool.isRequired,
      barsNearby: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default VenueList;