import { Link } from 'react-router-dom';

const VenueList = ({
  venues,
  title,
  showTitle,
  showName = true,
  showUsername = true,
}) => {
  if (!venues || !venues.length) {
    return <h3>No Venue Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {venues.map((venue) => (
        <div key={venue._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link
                className="text-light"
                to={`/profiles/${venue.venueAuthor}`}
              >
                {venue.venueAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  had this venue on {venue.createdAt}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  You found this venue on {venue.createdAt}
                </span>
              </>
            )}
          </h4>
          <div className="card-body bg-light p-2">
            <p>Venue Name: {venue.venueText}</p>
            <p>City: {venue.venueCity}</p>
            <p>State: {venue.venueState}</p>
            <p>Capacity: {venue.venueCapacity}</p>
            <p>Preferred Genre: {venue.preferredGenre}</p>
            <p>Catering: {venue.venueCatering ? 'Yes' : 'No'}</p>
            <p>Bars Nearby: {venue.venueBarsNearby ? 'Yes' : 'No'}</p>
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
