import React from 'react';
import PropTypes from 'prop-types';
import './VenueList.css';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
const VenueList = ({ venues }) => {
  if (!venues || !venues.length) {
    return <p>No venues found.</p>;
  }

  return (
    <div className="venue-list">
      {venues.map((venue) => (
        <div key={venue.id} className='venue'>
          <p>Name: {venue.name}</p>
          <p>State: {venue.state}</p>
          <p>City: {venue.city}</p>
          <p>Capacity: {venue.capacity}</p>
          <p>Preferred Genre: {venue.preferredGenre}</p>
          <p>Catering: {venue.catering ? 'Yes' : 'No'}</p>
          <p>Bars Nearby: {venue.barsNearby ? 'Yes' : 'No'}</p>
          <button className="submit-btn">Add Comment</button>
          <button className="submit-btn">View Comment</button>
        </div>
      ))}
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