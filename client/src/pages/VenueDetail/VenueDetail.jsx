// VenueDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_VENUE_DETAILS } from '../../utils/queries';
import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import './VenueDetail.css';
const VenueDetail = () => {
  const { venueId } = useParams();

  const { loading, error, data } = useQuery(GET_VENUE_DETAILS, {
    variables: { venueId },
  });

  const venue = data?.getVenueDetails || data?.venue;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!venue) return <p>Venue not found</p>;

  return (
    <div className="venue-detail-container">
      <p>Name: {venue.name}</p>
      <p>State: {venue.state}</p>
      <p>City: {venue.city}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Preferred Genre: {venue.preferredGenre}</p>
      <p>Catering: {venue.catering ? 'Yes' : 'No'}</p>
      <p>Bars Nearby: {venue.barsNearby ? 'Yes' : 'No'}</p>

      <div className="comment-section">
        <CommentForm venueId={venueId} />
      </div>

     
      <CommentList comments={venue.comments} />
    </div>
  );
};

export default VenueDetail;
