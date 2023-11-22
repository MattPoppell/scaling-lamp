import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_VENUES } from '../../utils/queries';

const FindVenue = () => {
  const [venueName, setVenueName] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [venueState, setVenueState] = useState('');
  const [venueCapacity, setVenueCapacity] = useState(0);
  const [preferredGenre, setPreferredGenre] = useState('');
  const [catering, setCatering] = useState(false);
  const [barsNearby, setBarsNearby] = useState(false);

  const { loading, error, data } = useQuery(QUERY_VENUES, {
    variables: {
      name: venueName,
      city: venueCity,
      state: venueState,
      capacity: venueCapacity,
      preferredGenre: preferredGenre,
      catering: catering,
      barsNearby: barsNearby,
    },
  });
  const handleSearch = () => {
    
    const textSearchCriteria = [venueName, venueCity, venueState, preferredGenre];
    const hasTextCriteria = textSearchCriteria.some((criteria) => criteria.trim().length > 0);
  
    if (!hasTextCriteria && !venueCapacity && !catering && !barsNearby) {
      
      alert('Please enter at least one search criteria');
      return; 
    }
  
    const capacity = parseInt(venueCapacity) || undefined; 
    const genre = preferredGenre.split(',').map((item) => item.trim()); 
  
    
    const searchCriteria = {
      name: venueName.trim(),
      city: venueCity.trim(),
      state: venueState.trim(),
      capacity: capacity,
      preferredGenre: genre,
      catering: catering,
      barsNearby: barsNearby,
    };
  
    
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="find-venue-container">
      <h3>Find Venues</h3>
      <input
        type="text"
        placeholder="Venue Name"
        value={venueName}
        onChange={(e) => setVenueName(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={venueCity}
        onChange={(e) => setVenueCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="State"
        value={venueState}
        onChange={(e) => setVenueState(e.target.value)}
      />
      <input
        type="text"
        placeholder="Capacity"
        value={venueCapacity}
        onChange={(e) => setVenueCapacity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Preferred Genre (comma-separated)"
        value={preferredGenre}
        onChange={(e) => setPreferredGenre(e.target.value)}
      />
      <label>
        Catering:
        <input
          type="checkbox"
          checked={catering}
          onChange={(e) => setCatering(e.target.checked)}
        />
      </label>
      <label>
        Bars Nearby:
        <input
          type="checkbox"
          checked={barsNearby}
          onChange={(e) => setBarsNearby(e.target.checked)}
        />
      </label>
  
      <button onClick={handleSearch}>Search</button>
  
      
    
  {data && data.venues && (
    <div>
      <h4>Results:</h4>
      {data.venues.map((venue) => (
        <div key={venue.id}>
          <p>Name: {venue.name}</p>
          <p>State: {venue.location}</p>
          <p>City: {venue.location}</p>
          <p>Capacity: {venue.capacity}</p>
          <p>Preferred Genre: {venue.preferredGenre}</p>
          <p>Catering: {venue.catering ? 'Yes' : 'No'}</p>
          <p>Bars Nearby: {venue.barsNearby ? 'Yes' : 'No'}</p>
         
          </div>
          ))}
        </div>
      )}
    </div>
  );
}; 
export default FindVenue;