const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} = graphql;
const Reservation = require('../models/reservation');

const ReservationType = new GraphQLObjectType({
  name: 'ReservationType',
  fields: () => ({
    name: {type: GraphQLString },
    id: {type: GraphQLID},
    hotelName: {type: GraphQLString },
    arrivalDate: {type: GraphQLString },
    departureDate: {type: GraphQLString }
  }),
    resolve(parentValue) {
      return Reservation.findReservation(parentValue.id);
  }
});


module.exports = ReservationType;
