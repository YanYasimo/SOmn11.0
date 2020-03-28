const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create an new ONG', async () => {
        const response = await request(app)
            //.set('Authorization', 'c83d4ecb')   //caso teste, tenha header para testar
            .post('/ongs')
            .send({
                    name: "APAD3",
                    email: "contato@apad.com.br",
                    whatsapp: "63981332211",
                    city: "Palmas",
                    uf: "TO"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});