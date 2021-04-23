const healthController = require('./controller');

module.exports = ({ healthRouter }) => {
    healthRouter.get('/', healthController.healthCheck);
};