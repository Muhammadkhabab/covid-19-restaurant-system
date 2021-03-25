const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

const data1 = {
  username: 'khoa165_getuser',
  email: 'khoa_getuser@gmail.com',
  password: 'abc123',
  confirmed_password: 'abc123',
  first_name: 'Harry',
  last_name: 'Le',
  phone_number: '604-312-1111',
};

module.exports = getUser = () => {
  describe('GET /users (getUser)', () => {
    let token;
    const prefix = supertestPrefix('/api/v1');

    before((done) => {
      request(app)
        .post('/users')
        .use(prefix)
        .send(data1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.token;
          done();
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    it('1. should return user if valid token is passed', (done) => {
      request(app)
        .get('/users')
        .use(prefix)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);

          const {
            username,
            email,
            first_name,
            last_name,
            phone_number,
          } = data1;

          expect(res.body).to.have.property('username').to.equal(username);
          expect(res.body).to.have.property('email').to.equal(email);
          expect(res.body).to.have.property('first_name').to.equal(first_name);
          expect(res.body).to.have.property('last_name').to.equal(last_name);
          expect(res.body)
            .to.have.property('phone_number')
            .to.equal(phone_number);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.not.have.property('restaurant_id');
          expect(res.body).to.have.property('is_admin').to.be.false;
          expect(res.body).to.have.property('is_staff').to.be.false;
          expect(res.body).to.have.property('is_developer').to.be.false;
          expect(res.body).to.have.property('is_customer').to.be.true;
          done();
        });
    });

    it('2. should return error message if no token is passed', (done) => {
      request(app)
        .get('/users')
        .use(prefix)
        .set({ Accept: 'application/json' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body)
            .to.have.property('msg')
            .to.equal('Token not found. Access denied!');
          done();
        });
    });

    it('3. should return error message if invalid token is passed', (done) => {
      request(app)
        .get('/users')
        .use(prefix)
        .set({ Accept: 'application/json', 'x-auth-token': 'abc' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body)
            .to.have.property('msg')
            .to.equal('Invalid token. Access denied!');
          done();
        });
    });
  });
};
