const venuesController = require('./controller');

module.exports = ({ venuesRouter }) => {
    venuesRouter.get('/', venuesController.getVenues);
};