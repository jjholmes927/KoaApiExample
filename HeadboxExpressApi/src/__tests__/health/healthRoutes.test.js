const request = require('supertest');
const server = require('../../api/server');

describe('health check', () => {
    afterAll(() => {
        server.close();
     });
    it('GET /health returns healthy', async () => {
        //Arrange
        //Act
        const response = await request(server).get('/health').set('Authorization', 'Bearer secureheadbox123');
        //Assert
        expect(response.status).toBe(200);
        expect(response.text).toContain('healthy');
    });

    it('GET /health without bearer token returns 401', async () => {
        //Arrange
        //Act
        const response = await request(server).get('/health');
        //Assert
        expect(response.status).toBe(401);
    });
});