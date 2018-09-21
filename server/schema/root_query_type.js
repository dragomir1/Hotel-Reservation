const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = graphql;
const ReservationType = require('./reservation_type');
const Reservation = mongoose.model('reservation');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    reservations: {
      type: new GraphQLList(ReservationType),
      resolve() {
        return Reservation.find({});
      }
    },
    reservation: {
      type: ReservationType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
          return Reservation.findById(id);
      }
    }
  })
});


module.exports = RootQuery;
