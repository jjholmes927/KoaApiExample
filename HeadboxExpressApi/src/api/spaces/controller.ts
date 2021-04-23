import { getRepository } from 'typeorm';
import { Space } from '../../entity/Space';
import { Venue } from '../../entity/Venue';


exports.getSpaces = async function (ctx, next) {
  const repo = getRepository(Space);
  var spaces = await repo.find();
  
  return ctx.body = spaces;
}

exports.getSpacesForVenueId = async function (ctx, next) {
  const repo = getRepository(Venue);
  var venueWithSpaces = await repo.findOne({ id: ctx.params.venueId }, { relations: ['spaces'] });
  
  return ctx.body = venueWithSpaces.spaces;
}