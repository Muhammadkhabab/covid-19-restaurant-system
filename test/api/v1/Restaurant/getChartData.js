const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

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
  restaurant_name: 'Harry Restaurant getChartData1',
  address: '1 Update University Avenue',

  username: 'khoa165_getchartdata1',
  email: 'khoa165_getchartdata1@wisc.edu',

  ...commonUserInfo,
  ...commonResInfo,
};

module.exports = getChartData = () => {
  describe('GET /restaurants (getChartData)', () => {
    const prefix = supertestPrefix('/api/v1');
    let id1;

    before((done) => {
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(res1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          id1 = res.body.restaurant._id;
          done();
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        mongoose.connection.dropCollection('restaurants', () => {
          done();
        });
      });
    });

    it('1. should return empty array for newly created restaurant with no records', (done) => {
      request(app)
        .get(`/restaurants/chart/${id1}`)
        .use(prefix)
        .set({ Accept: 'application/json' })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.lengthOf(0);
          done();
        });
    });
  });
};
