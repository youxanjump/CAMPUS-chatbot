const { gql } = require('apollo-server');

const typeDefs = gql`
  type Question{
    userQuestion: String!
  }
  type Intent{
    userIntent: String!
    Questions: [Question]
  }
  type Query{
    Intents: [Intent]
  }
`;


/*
# Your schema will go here

#An exclamation point (!) after a declared field's type means "this field's value can never be null."
type Launch {
  id: ID!
  site: String
  mission: Mission
  rocket: Rocket
  isBooked: Boolean!
}

type Rocket {
  id: ID!
  name: String
  type: String
}

# If a declared field's type is in [Square Brackets],
# it's an array of the specified type.
# If an array has an exclamation point after it,
# the array cannot be null, but it can be empty.

type User {
  id: ID!
  email: String!
  trips: [Launch]!
}

type Mission {
  name: String
  missionPatch(size: PatchSize): String
}

enum PatchSize {
  SMALL
  LARGE
}

type Query {
  launches( # replace the current launches query with this one.
  """
  The number of results to show. Must be >= 1. Default = 20

"""
  pageSize: Int
  """
  If you add a cursor here, it will only return results _after_ this cursor

"""
  after: String
): LaunchConnection!
  launch(id: ID!): Launch
  me: User
}

"""
Simple wrapper around our list of launches that contains a cursor to the
last item in the list. Pass this cursor to the launches query to fetch results
after these.
"""
type LaunchConnection { # add this below the Query type as an additional type.
cursor: String!
hasMore: Boolean!
launches: [Launch]!
}

type Mutation {
  bookTrips(launchIds: [ID]!): TripUpdateResponse!
  cancelTrip(launchId: ID!): TripUpdateResponse!
  login(email: String): String # login token
}

type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}
*/

module.exports = typeDefs;
