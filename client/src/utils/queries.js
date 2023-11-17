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

export const QUERY_VENUES = gql`
  query getVenues{
    venues{
      _id
      venueText
      venueAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_VENUE= gql`
  query getSingleThought($venueId: ID!) {
    venue(venueId: $venueId) {
      _id
      venueText
      venuetAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
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
      venues {
        _id
        venueText
        venueAuthor
        createdAt
      }
    }
  }
`;
