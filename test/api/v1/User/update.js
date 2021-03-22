const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

const data0 = {
  username: 'khoa165_update0',
  email: 'khoa_update0@gmail.com',
  password: 'abc123',
  confirmed_password: 'abc123',
  first_name: 'Harry',
  last_name: 'Le',
  phone_number: '604-312-1111',
};

const data1 = {
  username: 'khoa165_update',
  email: 'khoa_update@gmail.com',
  password: 'abc123',
  confirmed_password: 'abc123',
  first_name: 'Harry',
  last_name: 'Le',
  phone_number: '604-312-1111',
};

const data2 = {
  username: 'khoa165_update2',
  email: 'khoa_update@gmail.com',
  password: 'abc123',
  confirmed_password: 'abc123',
  first_name: 'Harry',
  last_name: 'Le',
  phone_number: '604-312-1111',
};

module.exports = update = () => {
  describe('PUT /users (update)', () => {
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

          request(app)
            .post('/users')
            .use(prefix)
            .send(data0)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    it('1. should update user if token is passed', (done) => {
      request(app)
        .put('/users')
        .use(prefix)
        .send({ first_name: 'Khoa' })
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);

          const { username, email, last_name, phone_number } = data1;

          expect(res.body).to.have.property('username').to.equal(username);
          expect(res.body).to.have.property('email').to.equal(email);
          expect(res.body).to.have.property('first_name').to.equal('Khoa');
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

    it('2. should update user for multiple valid input', (done) => {
      const temp2 = {
        first_name: 'Khoa (Harry)',
        email: 'khoa165_update2@gmail.com',
      };
      request(app)
        .put('/users')
        .use(prefix)
        .send(temp2)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          const { username, last_name, phone_number } = data1;
          const { first_name, email } = temp2;

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

    it('3. should update user for full input', (done) => {
      request(app)
        .put('/users')
        .use(prefix)
        .send(data2)
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
          } = data2;

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

    it('4. should return error message if no token is passed', (done) => {
      request(app)
        .put('/users')
        .use(prefix)
        .send({ first_name: 'Harry' })
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

    it('5. should return error message if invalid token is passed', (done) => {
      request(app)
        .put('/users')
        .use(prefix)
        .send({ first_name: 'Harry' })
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

    it('6. should return error message if new username exists', (done) => {
      const temp6 = {
        first_name: 'Harry',
        username: 'khoa165_update0',
      };
      request(app)
        .put('/users')
        .use(prefix)
        .send(temp6)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal(
              'Username was already taken. Please enter another username!'
            );

          done();
        });
    });

    it('7. should return error message if new email exists', (done) => {
      const temp7 = {
        last_name: 'Le',
        email: 'khoa_update0@gmail.com',
      };
      request(app)
        .put('/users')
        .use(prefix)
        .send(temp7)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Email was already taken. Please enter another email!');

          done();
        });
    });
  });
};
