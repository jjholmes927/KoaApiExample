const request = require('supertest');
const server = require('../../api/server');
const typeorm = require('typeorm');

describe('spaces check', () => {
    let connection;
    beforeAll(async () => {
        connection = await typeorm.createConnection();
    }); 
    afterAll(() => {
        server.close();
        connection.close();
     });
     it('GET /spaces returns spaces', async () => {
        //Arrange
        const expectedObj = [
            {
                "id": 1,
                "name": "Front Lawns"
            },
            {
                "id": 3,
                "name": "Garden Terrace"
            },
            {
                "id": 4,
                "name": "Laban Gardens"
            },
            {
                "id": 5,
                "name": "The Penthouse"
            },
            {
                "id": 2,
                "name": "The Roof Terrace"
            }
        ];
        //Act
        const response = await request(server).get('/spaces').set('Authorization', 'Bearer secureheadbox123');
        //Assert
        expect(response.body).toMatchObject(expectedObj);
        expect(response.status).toBe(200);
    });
    it('GET /spaces/:venueId returns spaces for a venue', async () => {
        //Arrange
        const expectedObj = [
            {
                "id": 1,
                "name": "Front Lawns"
            },
            {
                "id": 2,
                "name": "The Roof Terrace"
            },
            {
                "id": 3,
                "name": "Garden Terrace"
            },
            {
                "id": 4,
                "name": "Laban Gardens"
            },
            {
                "id": 5,
                "name": "The Penthouse"
            }
        ];
        //Act
        const response = await request(server).get('/spaces/1').set('Authorization', 'Bearer secureheadbox123');
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