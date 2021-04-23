# Headbox Api

# Project Dependencies
Npm 7.4.3
MySQL installed im using 8.0.23 

# Setting up

create a new database in your MySQL installation in this case we have called it headbox so - mysql.server start / create database headbox

then in the project ormconfig.js fill in the following necessary config.

For the first time running make sure Synchronize is set to TRUE therein after subsequent runs should be set to false.

```   
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "root",
   "password": "root",
   "database": "headbox",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/*.ts"
   ],
```

run npm install to ensure all node modules are present.

# Starting server

Then npm run start will configure the database entities using typeorm which can be found under src/entity, the csv will be imported and divided into the entities listed under there Bookings/Guests/Venues/Spaces and the server will be listening for requests on port 3000. 

If this was your first time running the server now set synchronize to be false!

# Api Examples

Make sure all requests are signed with the header token secureheadbox123  format of Authorization: Bearer secureheadbox123 in Postman call/test

GET localhost:3000/health - gives healthy when up and running

GET localhost:3000/venues - Lists all venues

GET localhost:3000/spaces - Lists all spaces

GET localhost:3000/spaces/{venueId} - Lists all spaces for a particular venue  
    Example localhost:3000/spaces/1 - gives following spaces for Fulham Palace - FrontLawns / Roof Terrace / Garden Terrace / Laban Gardens / The Penthouse

GET localhost:3000/bookings - Lists all bookings

GET localhost:3000/bookings/{venueId} - Lists all bookings for a particular venue
    Ability to filter bookings based upon;
    ?date
    ?eventType
    ?status

Example using one http://localhost:3000/bookings/5/?status=completed

Example using All three http://localhost:3000/bookings/1?status=pending&eventType=coorporate%20event&date=2019-03-21 should return [{"id":40,"date":"2019-03-21T10:47:31.000Z","numberOfGuests":0,"price":269.23,"priceCurrency":"£","eventType":"coorporate event","status":"pending"}]


# Tests
Projects jest test suite can be run with npm test

# Entity Structure
I decided to structure the database and split up the requirements into the following entities

Bookings (ManyToOne With Guest, ManyToOne With Venues)
Guests (OneToMany With Bookings)
Venues (OneToMany With Bookings, ManyToMany with spaces)
Spaces (ManyToMany with Venues)

The reason I did this is to provide a a flexible maintainable structure for implementing future features such as guest logging in with emails to view booking/ store tokens to validate api queries and also to give simplicity to the queries performed for the api requirements. 
