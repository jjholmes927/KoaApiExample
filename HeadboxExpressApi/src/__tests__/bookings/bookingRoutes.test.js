const request = require('supertest');
const server = require('../../api/server');
const typeorm = require('typeorm');

describe('bookings check', () => {
    let connection;
    beforeAll(async () => {
        connection = await typeorm.createConnection();
    }); 
    afterAll(() => {
        server.close();
        connection.close();
     });
    it('GET /bookings returns list', async () => {
        //Arrange
        //Act
        const response = await request(server).get('/bookings').set('Authorization', 'Bearer secureheadbox123');
        //Assert
        expect(response.body).toContainEqual({
            id: 99,
            date: '2019-03-21T08:06:29.000Z',
            numberOfGuests: 184,
            price: 536.19,
            priceCurrency: '£',
            eventType: 'private dinner',
            status: 'completed'
          });
        expect(response.status).toBe(200);
    });

    it('GET /bookings without bearer token returns 401', async () => {
        //Arrange
        //Act
        const response = await request(server).get('/bookings');
        //Assert
        expect(response.status).toBe(401);
    });

    it('GET /bookings and filters returns correctly filtered bookings', async () => {
        //Arrange
        //Act
        const response = await request(server).get('/bookings/1?status=pending&eventType=coorporate%20event&date=2019-03-21').set('Authorization', 'Bearer secureheadbox123');
        //Assert
        expect(response.body[0].status).toBe('pending');
        expect(response.body[0].eventType).toBe('coorporate event');
        expect(response.body[0].date.split('T')[0]).toBe('2019-03-21');
        expect(response.status).toBe(200);

    });
});