import { getRepository } from "typeorm";
import { Booking } from "../../entity/Booking";
import { Venue } from "../../entity/Venue";

exports.getBookings = async function (ctx, next) {
  const repo = getRepository(Booking);
  var bookings = await repo.find();
  
  return ctx.body = bookings;
}

exports.getBookingsByVenueId = async function (ctx, next) {
  const bookingRepo = getRepository(Booking);
  const venueRepo = getRepository(Venue);

  let venue = await venueRepo.findOne({ id: ctx.params.venueId })
  let bookings = await bookingRepo.find({ where: { venue: venue }});

  const queryParams = ctx.request.query;

  let filteredBookings = bookings;
  if (queryParams) {
    if (queryParams.status) {

      filteredBookings = filteredBookings.filter(b => b.status === queryParams.status);
    }
    if (queryParams.eventType) {
      filteredBookings = filteredBookings.filter(b => b.eventType === queryParams.eventType);
    }
    if (queryParams.date) {
      filteredBookings = filteredBookings.filter(b => b.date.toISOString().split('T')[0] === queryParams.date);
    }
  }

  return ctx.body = filteredBookings;
}