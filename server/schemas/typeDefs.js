const typeDefs = `

type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Venue {
    _id: ID
    name: String
    city: String
    state: String
    capacity: String
    preferredGenre: [String]
    catering: Boolean
    barsNearby: Boolean
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    venues: [Venue]
    venue(VenueId: ID!): Venue
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addVenue(name: String!, city: String, state: String, capacity: String, preferredGenre: String, catering: Boolean, barsNearby: Boolean): Venue
    addComment(venueId: ID!, commentText: String!): Venue
    removeVenue(venueId: ID!): Venue
    removeComment(venueId: ID!, commentId: ID!): Venue
  }
`;

module.exports = typeDefs;
