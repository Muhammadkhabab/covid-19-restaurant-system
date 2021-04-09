const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');
const async = require('async');

const commonUserInfo = {
  first_name: 'Harry',
  last_name: 'Le',
  phone_number: '123-456-7890',
  password: 'abc123',
  confirmed_password: 'abc123',
};

const commonResInfo = {
  restaurant_email: 'rest_email@gmail.com',
  restaurant_phone_number: '111-111-1111',
  cuisine: 'vegan',
  website_url: 'awebsite.com',
  dine_in: 0,
  dine_outside: 0,
  pickup: 0,
  curbside_pickup: 1,
  delivery: 0,
  policy_notes: 'Keep your mask over your nose!',
  employee_capacity: 10,
  customer_capacity: 10,
  number_tables: 7,
  square_footage: 500,
  customer_per_table: 10,
  tables_distance: 10,
};

const res1 = {
  restaurant_name: 'Harry Restaurant filter1 rose',
  address: '1 Filter University Avenue',

  username: 'khoa165_filter1',
  email: 'khoa165_filter1@wisc.edu',

  ...commonUserInfo,
  ...commonResInfo,
};

const res2 = {
  restaurant_name: 'Harry Restaurant filter2 butterfly',
  address: '2 Filter University Avenue',

  username: 'khoa165_filter2',
  email: 'khoa165_filter2@wisc.edu',

  ...commonUserInfo,
  ...commonResInfo,
};

const res3 = {
  restaurant_name: 'Harry Restaurant filter3 house',
  address: '3 Filter University Avenue',

  username: 'khoa165_filter3',
  email: 'khoa165_filter3@wisc.edu',

  ...commonUserInfo,
  ...commonResInfo,
};

const res4 = {
  restaurant_name: 'Harry Restaurant filter4 butterfly',
  address: '4 Filter University Avenue',

  username: 'khoa165_filter4',
  email: 'khoa165_filter4@wisc.edu',

  ...commonUserInfo,
  ...commonResInfo,
};

module.exports = filter = () => {
  describe('GET /restaurants (filter)', () => {
    const prefix = supertestPrefix('/api/v1');
    let id1;

    before((done) => {
      async.series(
        [
          function (callback) {
            request(app)
              .post('/restaurants')
              .use(prefix)
              .send(res1)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .end((err, res) => {
                if (err) return done(err);
                id1 = res.body.restaurant._id;
                callback();
              });
          },
          function (callback) {
            request(app)
              .post('/restaurants')
              .use(prefix)
              .send(res2)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .end((err, res) => {
                if (err) return done(err);
                callback();
              });
          },

          function (callback) {
            request(app)
              .post('/restaurants')
              .use(prefix)
              .send(res3)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .end((err, res) => {
                if (err) return done(err);
                callback();
              });
          },

          function (callback) {
            request(app)
              .post('/restaurants')
              .use(prefix)
              .send(res4)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .end((err, res) => {
                if (err) return done(err);
                callback();
              });
          },
        ],
        done
      );
    });

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        mongoose.connection.dropCollection('restaurants', () => {
          done();
        });
      });
    });

    it('1. should return appropriate restaurants when filtered by name', (done) => {
      request(app)
        .get(`/restaurants/filter?search=butterfly`)
        .use(prefix)
        .set({ Accept: 'application/json' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          console.log(res.body);
          // expect(res.body).to.have.lengthOf(2);
          done();
        });
    });
  });
};
