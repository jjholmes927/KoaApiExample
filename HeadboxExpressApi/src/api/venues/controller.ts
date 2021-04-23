import { getRepository } from 'typeorm';
import { Venue } from '../../entity/Venue';

exports.getVenues = async function (ctx, next) {
    const repo = getRepository(Venue);
    var venueList = await repo.find();

    return ctx.body = venueList.sort((v1, v2) =>  v1.id - v2.id);
};
