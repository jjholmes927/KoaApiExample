const bookingsController = require('./controller');

module.exports = ({ bookingsRouter }) => {
    bookingsRouter.get('/', bookingsController.getBookings);
    bookingsRouter.get('/:venueId', bookingsController.getBookingsByVenueId)
};