const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReservationSchema = new Schema({
//   reservation: { type: String},
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'guest'
  }
});
//   {
//     name: String,
//     id: Number,
//     hotelName: String,
//     arrivalDate: String,
//     departureDate: String,
// });


ReservationSchema.statics.findreservation = (id) => {
  return this.findById(id)
    .populate('reservation')
    .then(reservation => reservation.id);
};

const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;
