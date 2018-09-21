const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Reservation = mongoose.model('reservation');
const ReservationType = require('./reservation_type');



const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addReservation: {
      type: ReservationType,
      args: {
        name: {type: GraphQLString},
        id: {type: GraphQLID},
        hotelName: {type: GraphQLString},
        arrivalDate: {type: GraphQLString},
        departureDate: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        let reservation = new Reservation({
          name: args.name,
          hotelName: args.hotelName,
          arrivalDate: args.arrivalDate,
          departureDate: args.departureDate
        });
        return reservation.save();
      }
    }
  }
});

module.exports = mutation;
