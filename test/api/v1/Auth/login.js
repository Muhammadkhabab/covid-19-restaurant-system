const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

const data1 = {
  username: 'khoa165_login',
  email: 'khoa_login@gmail.com',
  password: 'abc123',
  confirmed_password: 'abc123',
  first_name: 'Harry',
  last_name: 'Le',
  phone_number: '604-312-1111',
};

module.exports = login = () => {
  describe('POST /auth (login)', () => {
    const prefix = supertestPrefix('/api/v1');

    before((done) => {
      request(app)
        .post('/users')
        .use(prefix)
        .send(data1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    it('1. should return token for valid username and password', (done) => {
      request(app)
        .post('/auth')
        .use(prefix)
        .send({ credential: 'khoa165_login', password: 'abc123' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('2. should return token for valid email and password', (done) => {
      request(app)
        .post('/auth')
        .use(prefix)
        .send({ credential: 'khoa_login@gmail.com', password: 'abc123' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('3. should return error messages for missing credential and password', (done) => {
      request(app)
        .post('/auth')
        .use(prefix)
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(2);
          const msgs = [
            ['credential', 'Email or username is required!'],
            ['password', 'Password is required!'],
          ];
          msgs.forEach((msg, i) => {
            expect(res.body.errors[i])
              .to.have.property('param')
              .to.equal(msg[0]);
            expect(res.body.errors[i]).to.have.property('msg').to.equal(msg[1]);
          });
          done();
        });
    });

    it('4. should return error message for credential not existing', (done) => {
      request(app)
        .post('/auth')
        .use(prefix)
        .send({ credential: 'khoa165@gmail.com', password: '123456789' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Invalid credentials! Please try again!');
          done();
        });
    });

    it('5. should return error message for valid credential and incorrect password', (done) => {
      request(app)
        .post('/auth')
        .use(prefix)
        .send({ credential: 'khoa_login@gmail.com', password: '123456789' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Invalid credentials! Please try again!');
          done();
        });
    });

    it('6. should return error message for not existing email', (done) => {
      request(app)
        .post('/auth')
        .use(prefix)
        .send({ credential: 'khoa165@gmail.com', password: '123456789' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Invalid credentials! Please try again!');
          done();
        });
    });

    it('7. should return error message for not existing username', (done) => {
      request(app)
        .post('/auth')
        .use(prefix)
        .send({ credential: 'khoa165_login7', password: '123456789' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Invalid credentials! Please try again!');
          done();
        });
    });
  });
};
