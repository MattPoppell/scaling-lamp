import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_VENUE = gql`
mutation AddVenue($name: String!, $city: String, $state: String, $capacity: String, $preferredGenre: String, $catering: Boolean, $barsNearby: Boolean) {
  addVenue(name: $name, city: $city, state: $state, capacity: $capacity, preferredGenre: $preferredGenre, catering: $catering, barsNearby: $barsNearby) {
    _id
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation AddComment($venueId: ID!, $commentText: String!) {
  addComment(venueId: $venueId, commentText: $commentText) {
    _id
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const REMOVE_COMMENT = gql`
mutation RemoveComment($venueId: ID!, $commentId: ID!) {
  removeComment(venueId: $venueId, commentId: $commentId) {
    _id
    name
    city
    state
    capacity
    preferredGenre
    catering
    barsNearby
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const REMOVE_VENUE = gql`
  mutation removeVenue($venueId: ID!, $commentText: String!) {
    removeVenue(venueId: $venueId) {
      _id
      
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;