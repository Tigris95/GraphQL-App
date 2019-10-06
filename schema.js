const {
  GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema,
} = require('graphql');

const axios = require('axios');


const RocketType = new GraphQLObjectType({
  name: 'rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

// launch Type
const LauchType = new GraphQLObjectType({

  name: 'launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_data_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});


// root query

const RootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    launches: {
      type: new GraphQLList(LauchType),
      // eslint-disable-next-line no-unused-vars
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v3/launches')
          .then((res) => res.data);
      },
    },
    launch: {
      type: LauchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
