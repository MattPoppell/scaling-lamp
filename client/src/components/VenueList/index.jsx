// VenueList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const VenueList = ({ venues, title }) => {
  if (!venues || !venues.length) {
    return <h3>{title}</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {venues.map((venue) => (
        <div key={venue._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>Venue Name: {venue.name}</p>
            <p>City: {venue.city}</p>
            <p>State: {venue.state}</p>
            {/* Add other venue details as needed */}
          </div>
          <Link
            className="btn btn-primary btn-block btn-squared"
            to={`/venues/${venue._id}`}
          >
            Join the discussion on this venue.
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VenueList;
