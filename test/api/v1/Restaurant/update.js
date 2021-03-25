const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

const data0 = {
  first_name: 'Cecelia',
  last_name: 'Peterson',
  username: 'cpeterson3663',
  email: 'anemail@wisc.edu',
  phone_number: '222-222-2222',
  password: 'apassword1',
  confirmed_password: 'apassword1',
  restaurant_name: "Cela's Restauranttt",
  avatar: 'avater.jpg',
  address: '1 University Avenue',
  restaurant_email: 'rest_email@gmail.com',
  restaurant_phone_number: '111-111-1111',
  cuisine: 'vegan',
  website_url: 'awebsite.com',
  dine_in: 0,
  dine_outside: 0,
  pickup: 0,
  curbside_pickup: 1,
  delivery: 0,
  policy_notes: 'keep your mask over your nose!',
  employee_capacity: 10,
  customer_capacity: 10,
  number_tables: 7,
  square_footage: 500,
  customer_per_table: 10,
  tables_distance: 10,
};

const data1 = {
  restaurant_name: "Cela's BBQ Pit",
  address: '1 University Avenue',
  avatar: 'avater.jpg',
  restaurant_email: 'rest_email@gmail.com',
  restaurant_phone_number: '111-111-1111',
  cuisine: 'vegan',
  website_url: 'awebsite.com',
  dine_in: false,
  dine_outside: false,
  pickup: false,
  curbside_pickup: true,
  delivery: false,
  policy_notes: 'keep your mask over your nose!',
  employee_capacity: 10,
  customer_capacity: 10,
  number_tables: 7,
  square_footage: 500,
  customer_per_table: 10,
  tables_distance: 10,
};

const data4 = {
  restaurant_name: "Pauls",
  address: '3 University Avenue',
  avatar: 'avater.jpg',
  restaurant_email: 'rest_email@gmail.com',
  restaurant_phone_number: '111-111-1111',
  cuisine: 'vegan',
  website_url: 'awebsite.com',
  dine_in: false,
  dine_outside: false,
  pickup: false,
  curbside_pickup: true,
  delivery: false,
  policy_notes: 'keep your mask over your nose!',
  employee_capacity: 10,
  customer_capacity: 10,
  number_tables: 7,
  square_footage: 500,
  customer_per_table: 10,
  tables_distance: 10,
};

const data3 = {
  first_name: 'Paul',
  last_name: 'Peterson',
  username: 'cpeterson36633',
  email: 'anemail@wisc.edu',
  phone_number: '222-222-2222',
  password: 'apassword1',
  confirmed_password: 'apassword1',
  restaurant_name: "Pauls",
  avatar: 'avater.jpg',
  address: '3 University Avenue',
  restaurant_email: 'rest_email@gmail.com',
  restaurant_phone_number: '111-111-1111',
  cuisine: 'vegan',
  website_url: 'awebsite.com',
  dine_in: 0,
  dine_outside: 0,
  pickup: 0,
  curbside_pickup: 1,
  delivery: 0,
  policy_notes: 'keep your mask over your nose!',
  employee_capacity: 10,
  customer_capacity: 10,
  number_tables: 7,
  square_footage: 500,
  customer_per_table: 10,
  tables_distance: 10,
};

module.exports = update = () => {
  describe('PUT /restaurants (update)', () => {
    let token;
    const prefix = supertestPrefix('/api/v1');

    before((done) => {
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(data0)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.token;
          request(app)
            .post('/restaurants')
            .use(prefix)
            .send(data3)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('restaurants', () => {
        done();
      });
    });

    it('1. Should update restaurant for full input if token is passed', (done) => {
      request(app)
        .put('/restaurants')
        .use(prefix)
        .send(data1)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);

          const { restaurant_name, avatar, address, restaurant_email, restaurant_phone_number, cuisine, website_url,
                  dine_in, dine_outside, pickup, curbside_pickup, delivery, policy_notes, 
                  employee_capacity, customer_capacity, number_tables, square_footage, 
                  customer_per_table, tables_distance } = data1;

          expect(res.body).to.have.property('restaurant_name').to.equal(restaurant_name);
          expect(res.body).to.have.property('address').to.equal(address);
          expect(res.body).to.have.property('avatar').to.equal(avatar);
          expect(res.body).to.have.property('website_url').to.equal(website_url);
          expect(res.body).to.have.property('restaurant_email').to.equal(restaurant_email);
          expect(res.body).to.have.property('restaurant_phone_number').to.equal(restaurant_phone_number);
          expect(res.body).to.have.property('cuisine').to.equal(cuisine);
          expect(res.body).to.have.property('dine_in').to.equal(dine_in);
          expect(res.body).to.have.property('dine_outside').to.equal(dine_outside);
          expect(res.body).to.have.property('pickup').to.equal(pickup);
          expect(res.body).to.have.property('curbside_pickup').to.equal(curbside_pickup);
          expect(res.body).to.have.property('delivery').to.equal(delivery);
          expect(res.body).to.have.property('employee_capacity').to.equal(employee_capacity);
          expect(res.body).to.have.property('customer_capacity').to.equal(customer_capacity);
          expect(res.body).to.have.property('policy_notes').to.equal(policy_notes);
          expect(res.body).to.have.property('number_tables').to.equal(number_tables);
          expect(res.body).to.have.property('square_footage').to.equal(square_footage);
          expect(res.body).to.have.property('customer_per_table').to.equal(customer_per_table);
          expect(res.body).to.have.property('tables_distance').to.equal(tables_distance);
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('2. Should return error message if no token is passed', (done) => {
      request(app)
        .put('/restaurants')
        .use(prefix)
        .send(data0)
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

    it('3. Should return error message if invalid token is passed', (done) => {
      request(app)
        .put('/restaurants')
        .use(prefix)
        .send(data0)
        .set({ Accept: 'application/json', 'x-auth-token': 'invalid_token' })
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

    it('4. Return error if restaurant at same name and address exists', (done) => {
      request(app)
        .put('/restaurants')
        .use(prefix)
        .send(data4)
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
              'There exists a restaurant with the same name at this address. Please enter another name or address.'
            );
          done();
        });
    });

  });
};
