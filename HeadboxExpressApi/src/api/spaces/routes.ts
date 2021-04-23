const spacesController = require('./controller');

module.exports = ({ spacesRouter }) => {
  spacesRouter.get('/', spacesController.getSpaces);
  spacesRouter.get('/:venueId', spacesController.getSpacesForVenueId);
};