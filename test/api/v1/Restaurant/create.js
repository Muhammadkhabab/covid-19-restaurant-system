const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

module.exports = create = () => {
  describe('POST /restaurants (create)', () => {
    const prefix = supertestPrefix('/api/v1');
    const goodData = {
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

    before((done) => {
      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      done();
    });

    after((done) => {
      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      done();
    });

    it('1. Should return token for valid input', (done) => {
      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(goodData)
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

    it('2. Should return error messages for missing fields', (done) => {
      const data0 = {
        first_name: 'Cecelia',
        last_name: 'Peterson',
        username: 'cpeterson3663',
        email: 'anemail@wisc.edu',
        phone_number: '222-222-2222',
        password: 'apassword1',
        confirmed_password: 'apassword1',
        address: '1 University Avenue',
        restaurant_email: 'rest_email@gmail.com',
        restaurant_phone_number: '111-111-1111',
        cuisine: 'vegan',
        website_url: 'awebsite.com',
        dine_in: 0,
        dine_outside: 0,
        curbside_pickup: 1,
        delivery: 0,
        policy_notes: 'keep your mask over your nose!',
        employee_capacity: 10,
        customer_capacity: 10,
        square_footage: 500,
        customer_per_table: 10,
        tables_distance: 10,
      };

      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(data0)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(5);
          const msgs = [
            ['restaurant_name', 'Missing restaurant name!'],
            ['pickup', 'Missing pickup!'],
            ['pickup', 'Value must be 0 or 1'],
            ['number_tables', 'Missing number tables!'],
            ['number_tables', 'Invalid value'],
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

    it('3. Should return error message for existing email', (done) => {
      const data1 = {
        first_name: 'Paul',
        last_name: 'Peterson',
        username: 'newguy',
        email: 'anemail@wisc.edu',
        phone_number: '222-222-2222',
        password: 'apassword1',
        confirmed_password: 'apassword1',
        restaurant_name: 'Pauls',
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

      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(goodData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          request(app)
            .post('/restaurants')
            .use(prefix)
            .send(data1)
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
    });

    it('4. Should return error message for existing username', (done) => {
      const data1 = {
        first_name: 'Paul',
        last_name: 'Peterson',
        username: 'cpeterson3663',
        email: 'newguy@wisc.edu',
        phone_number: '222-222-2222',
        password: 'apassword1',
        confirmed_password: 'apassword1',
        restaurant_name: 'Pauls',
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

      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(goodData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          request(app)
            .post('/restaurants')
            .use(prefix)
            .send(data1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.have.property('errors');
              expect(res.body.errors).to.have.lengthOf(1);
              expect(res.body.errors[0])
                .to.have.property('msg')
                .to.equal('Username was already taken. Please enter another username!');
              done();
            });
        });
    });


    it('5. Should return error message for mismatching passwords', (done) => {
      const data0 = {
        first_name: 'Cecelia',
        last_name: 'Peterson',
        username: 'cpeterson3663',
        email: 'anemail@wisc.edu',
        phone_number: '222-222-2222',
        password: 'apassword1',
        confirmed_password: 'notsamepassword1',
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
      
      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(data0)
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

    it('6. Should return error message for invalid email', (done) => {
      const data0 = {
        first_name: 'Cecelia',
        last_name: 'Peterson',
        username: 'cpeterson3663',
        email: 'invalid@wisc',
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

      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(data0)
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

    it('7. Should return error message for multiple invalid input', (done) => {
      const data0 = {
        first_name: 'Cecelia',
        last_name: 'Peterson',
        username: 'cpeterson3663',
        email: 'anemail@wisc',
        phone_number: '222-222-2222',
        password: 'pass1',
        confirmed_password: 'pass1',
        restaurant_name: "Cela's Restauranttt",
        avatar: 'avater.jpg',
        address: '1 University Avenue',
        restaurant_email: 'rest_email@gmail',
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

      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(data0)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(2);
          const msgs = [
            ['email', 'Please enter a valid email!'],
            ['password', 'Password must be between 6 and 20 characters long!'],
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

    it('8. Should return error message for an invalid password (wrong num chars)', (done) => {
      const data0 = {
        first_name: 'Cecelia',
        last_name: 'Peterson',
        username: 'cpeterson3663',
        email: 'anemail@wisc.esu',
        phone_number: '222-222-2222',
        password: 'pass1',
        confirmed_password: 'pass1',
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

      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(data0)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Password must be between 6 and 20 characters long!');
          done();
        });
    });

    it('9. Should return error message for an invalid password (no number)', (done) => {
      const data0 = {
        first_name: 'Cecelia',
        last_name: 'Peterson',
        username: 'cpeterson3663',
        email: 'anemail@wisc.edu',
        phone_number: '222-222-2222',
        password: 'apassword',
        confirmed_password: 'apassword',
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

      mongoose.connection.dropCollection('users');
      mongoose.connection.dropCollection('restaurants');
      request(app)
        .post('/restaurants')
        .use(prefix)
        .send(data0)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Password must contain a number!');
          done();
        });
    });

  });
};
