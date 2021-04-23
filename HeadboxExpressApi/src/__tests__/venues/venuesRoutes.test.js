const request = require('supertest');
const server = require('../../api/server');
const typeorm = require('typeorm');

describe('venues check', () => {
    let connection;
    beforeAll(async () => {
        connection = await typeorm.createConnection();
    }); 
    afterAll(() => {
        server.close();
        connection.close();
     });
    it('GET /venues returns list', async () => {
        //Arrange
        const expectedObj = [
            {
                "id": 1,
                "name": "Fulham Palace"
            },
            {
                "id": 2,
                "name": "Geffrye Museum"
            },
            {
                "id": 3,
                "name": "The Royal Park Hotel London"
            },
            {
                "id": 4,
                "name": "Pergola Paddington"
            },
            {
                "id": 5,
                "name": "De Vere Grand Connaught"
            },
            {
                "id": 6,
                "name": "Madison"
            },
            {
                "id": 7,
                "name": "The Postal Museum"
            },
            {
                "id": 8,
                "name": "Mandarin Oriental"
            },
            {
                "id": 9,
                "name": "The Driver"
            },
            {
                "id": 10,
                "name": "Laban Building"
            }
        ];
        //Act
        const response = await request(server).get('/venues').set('Authorization', 'Bearer secureheadbox123');
        //Assert
        expect(response.body).toMatchObject(expectedObj);
        expect(response.status).toBe(200);
    });

    it('GET /venues without bearer token returns 401', async () => {
        //Arrange
        //Act
        const response = await request(server).get('/venues');
        //Assert
        expect(response.status).toBe(401);
    });
});