const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema } = require('graphql');
const axios = require('axios');

const PLACE = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
const PROXY = "https://secret-atoll-96241.herokuapp.com/";
const RADIUS = 15000;
const SEARCH_QUERY = 'wuse zone 2 abuja';
const TYPE = 'hospital';

// LocationType 
const LocationType = new GraphQLObjectType({
    name: 'location',
    fields: () => ({
        name: {type: GraphQLString},
        formatted_address: {type: GraphQLString},
        business_status: {type: GraphQLString}
    })
});

// RootQuery
const RootQuery =new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        locations: {
            type: new GraphQLList(LocationType),
            resolve(parent, args) {
                return axios.get(`${PLACE}query=${SEARCH_QUERY}&radius=${RADIUS}&type=${TYPE}&key=${process.env.PLACES_API_KEY}`)
                    .then(response => response.data.results);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});