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
  mutation addVenue($venueText: String!) {
    addVenue(venueText: $venueText) {
      _id
      venueText
      venueAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($venueId: ID!, $commentText: String!) {
    addComment(venueId: $venueId, commentText: $commentText) {
      _id
      venueText
      venueAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
