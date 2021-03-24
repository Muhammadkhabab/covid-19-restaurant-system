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

    it('1. should return token for valid input', (done) => {
      const harry = {
        username: 'khoa165_register1',
        email: 'khoa_register1@gmail.com',
        password: 'abc123',
        confirmed_password: 'abc123',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(harry)
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

    it('2. should return error messages for missing fields', (done) => {
      const harry = {
        username: 'khoa165_register2',
        password: 'abc123',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(harry)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(3);
          const msgs = [
            ['email', 'Missing email!'],
            ['email', 'Please enter a valid email!'],
            ['confirmed_password', 'Missing confirmed password!'],
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

    it('3. should return error message for existing email', (done) => {
      const harry = {
        username: 'khoa165_register3',
        email: 'khoa_register1@gmail.com',
        password: 'abc123',
        confirmed_password: 'abc123',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(harry)
        .set('Accept', 'application/json')
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

    it('4. should return error message for existing username', (done) => {
      const harry = {
        username: 'khoa165_register1',
        email: 'khoa_register4@gmail.com',
        password: 'abc123',
        confirmed_password: 'abc123',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(harry)
        .set('Accept', 'application/json')
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

    it('5. should return error message for mismatching passwords', (done) => {
      const harry = {
        username: 'khoa165_register5',
        email: 'khoa_register5@gmail.com',
        password: 'abc123',
        confirmed_password: 'abc1234',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(harry)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Passwords do not match!');
          done();
        });
    });

    it('6. should return error message for invalid email', (done) => {
      const harry = {
        username: 'khoa165_register6',
        email: 'khoa_register6@gmail',
        password: 'abc123',
        confirmed_password: 'abc123',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(harry)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Please enter a valid email!');
          done();
        });
    });

    it('7. should return error message for multiple invalid input', (done) => {
      const harry = {
        username: 'khoa165_register1',
        email: 'khoa_register7@gmail',
        password: 'abc123',
        confirmed_password: 'abc1234',
        first_name: 'Harry',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(harry)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(3);
          const msgs = [
            ['last_name', 'Missing last name!'],
            ['email', 'Please enter a valid email!'],
            ['phone_number', 'Missing phone number!'],
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
  });
};
