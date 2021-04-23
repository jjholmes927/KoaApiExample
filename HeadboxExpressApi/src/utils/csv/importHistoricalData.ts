import { Space } from "../../entity/Space";
import { getManager, getRepository, getConnection } from "typeorm";
import { Venue } from "../../entity/Venue";
import { Guest } from "../../entity/Guest";
import { Booking } from "../../entity/Booking";

const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

export const importHistoricalData = async () => {
  let csvData = [];

    fs.createReadStream(path.resolve(__dirname, './../../data/historical_data.csv'))
    .pipe(csv())
      .on('data', async (row) => {
        csvData.push(validateRow(row));
    })
    .on('end', async () => {
      await saveCsvData(csvData);
      console.log('Historical Data Imported To Database');
    });
}

const validateRow = (row) => {
  //Convert empty rows to parseable 
  if(row.number_of_guests === '') {
      row.number_of_guests = '0';
  }

  //split number value of price and currency
  const priceArr: string[] = row.price.split('');
  row.currency = priceArr.shift();
  row.price = priceArr.join('');

  return row;
};

const saveCsvData = async (csvData: any[]) => {
  for (var line of csvData) {
    try {
      await saveRow(line); 
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        continue;
      } else {
        throw e;
      }
      
    }
  }
}

const saveRow = async (row: any) => {
  const entityManager = getManager();

  let space = await getSpace(row.space_name);
  let venue = await getVenue(space, row.venue_name);
  let guest = await getGuest(row.guest_name, row.guest_email);

  let booking = new Booking();
  booking.date = row.date;
  booking.venue = venue;
  booking.guest = guest;
  booking.numberOfGuests = row.number_of_guests;
  booking.price = row.price;
  booking.priceCurrency;
  booking.status = row.status;
  booking.eventType = row.type_event;

  await entityManager.save(booking);
}

const getSpace = async (name: string) => {
  const repo = getRepository(Space);
  let space = await repo.findOne({ name: name });

  if (!space) {
    space = new Space();
    space.name = name;
    await repo.save(space);
    space = await repo.findOne({ name: name });
  }

  return space;
}

const getVenue = async (space: Space, venueName: string) => {
  const repo = getRepository(Venue);
  let venue = await repo.findOne({ name: venueName }, { relations: ["spaces"] });

  if (!venue) {
    venue = new Venue();
    venue.name = venueName;
    venue.spaces = [space];
    await repo.save(venue);
    venue = await repo.findOne({ name: venueName }, { relations: ["spaces"] });
  }

  if (!venue.spaces.some(s => s.id === space.id)) {
    await getConnection()
      .createQueryBuilder()
      .relation(Venue, "spaces")
      .of(venue)
      .add(space);
  }

  return venue;
}

const getGuest = async (name: string, email: string) => {
  const repo = getRepository(Guest);
  let guest = await repo.findOne({ email: email });

  if (!guest) {
    guest = new Guest();
    guest.email = email;
    guest.name = name;
    await repo.save(guest);
    guest = await repo.findOne({ email: email });
  }

  return guest;
}
