import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      venues {
        _id
        venuesText
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
query Users {
  users {
    username
    email
  }
}
`;
 

export const QUERY_VENUES = gql`
query Venues {
  venues {
    _id
    name
    city
    state
    capacity
    catering
    barsNearby
    comments {
      createdAt
      commentText
      commentAuthor
    }
  }
}
`;

export const QUERY_SINGLE_VENUE_ID= gql`
query Venue($venueId: ID) {
  venue(venueId: $venueId) {
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      createdAt
      commentText
      commentAuthor
    }
  }
}
`;

export const QUERY_SINGLE_VENUE_NAME= gql`
query VenueName($venueName: String) {
  venueName(venueName: $venueName) {
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      createdAt
      commentText
      commentAuthor
    }
  }
}
`;

export const QUERY_SINGLE_VENUE_CITY= gql`
query VenueCity($venueCity: String) {
  venueCity(venueCity: $venueCity) {
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      createdAt
      commentText
      commentAuthor
    }
  }
}
`;

export const QUERY_SINGLE_VENUE_STATE= gql`
query VenueState($venueState: String) {
  venueState(venueState: $venueState) {
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      createdAt
      commentText
      commentAuthor
    }
  }
}
`;

export const QUERY_SINGLE_VENUE_FOOD= gql`
query VenueFood($venueFood: Boolean) {
  venueFood(venueFood: $venueFood) {
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      createdAt
      commentText
      commentAuthor
    }
  }
}
`;

export const QUERY_SINGLE_VENUE_GENRE= gql`
query VenueGenre($preferredGenre: String) {
  venueGenre(preferredGenre: $preferredGenre) {
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      createdAt
      commentText
      commentAuthor
    }
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_VENUE_DETAILS = gql`
  query GetVenueDetails($venueId: ID!) {
    venue(venueId: $venueId) {
      _id
      name
      city
      state
      capacity
      preferredGenre
      catering
      barsNearby
      comments {
        createdAt
        commentText
        commentAuthor
      }
    }
  }
`;