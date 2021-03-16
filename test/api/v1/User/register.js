const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

module.exports = register = () => {
  describe('POST /users (register)', () => {
    const prefix = supertestPrefix('/api/v1');

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    it('should return token for valid input', (done) => {
      const user = {
        username: 'khoa165',
        email: 'khoa@gmail.com',
        password: 'abc123',
        confirmed_password: 'abc123',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      };
      request(app)
        .post('/users')
        .use(prefix)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          // console.log(err.errors);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });
};
