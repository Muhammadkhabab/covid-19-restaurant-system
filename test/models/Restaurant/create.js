const expect = require('chai').expect;
const Restaurant = require('../../../models/Restaurant');

module.exports = create = () => {
  describe('#create', () => {
    it('should return errors for mandatory fields', (done) => {
      const restaurant = new Restaurant();
      restaurant.validate((err) => {
        expect(err.errors.restaurant_name).to.exist;
        expect(err.errors.address).to.exist;
        expect(err.errors.restaurant_email).to.exist;
        expect(err.errors.restaurant_phone_number).to.exist;
        expect(err.errors.restaurant_name).to.exist;
        expect(err.errors.dine_in).to.exist;
        expect(err.errors.dine_outside).to.exist;
        expect(err.errors.pickup).to.exist;
        expect(err.errors.curbside_pickup).to.exist;
        expect(err.errors.delivery).to.exist;
        expect(err.errors.employee_capacity).to.exist;
        expect(err.errors.customer_capacity).to.exist;
        expect(err.errors.number_tables).to.exist;
      });
      done();
    });

    it('should save a valid restaurant', (done) => {
      const data = {
        first_name: 'Cecelia',
        last_name: 'Peterson',
        username: 'cpeterson36',
        email: 'anemail@wisc.edu',
        phone_number: '222-222-2222',
        password: 'apassword1',
        confirmed_password: 'apassword1',
        restaurant_name: "Cela's Restaurant",
        avatar: 'avater.jpg',
        address: '1 University Avenue',
        restaurant_email: 'rest_email@gmail.com',
        restaurant_phone_number: '111-111-1111',
        cuisine: 'vegan',
        website_url: 'awebsite.com',
        dine_in: false,
        dine_outside: true,
        pickup: false,
        curbside_pickup: false,
        delivery: false,
        policy_notes: 'keep your mask over your nose!',
        employee_capacity: 10,
        customer_capacity: 10,
        number_tables: 7,
        square_footage: 500,
      };
      const { first_name, last_name, username, email, phone_number, password, confirmed_password, 
        restaurant_name, avatar, address, restaurant_email, restaurant_phone_number, cuisine, 
        website_url, dine_in, dine_outside, pickup, curbside_pickup, delivery, policy_notes, 
        employee_capacity, customer_capacity, number_tables, square_footage, 
        customer_per_table, tables_distance } = data;
      const celasRest = new Restaurant(data);
      expect(celasRest.reviewed).to.be.false;
      celasRest
        .save()
        .then((restaurant) => {
          expect(restaurant).to.have.property('restaurant_name').to.equal(restaurant_name);
          expect(restaurant).to.have.property('address').to.equal(address);
          expect(restaurant).to.have.property('avatar').to.equal(avatar);
          expect(restaurant).to.have.property('website_url').to.equal(website_url);
          expect(restaurant).to.have.property('restaurant_email').to.equal(restaurant_email);
          expect(restaurant).to.have.property('restaurant_phone_number').to.equal(restaurant_phone_number);
          expect(restaurant).to.have.property('cuisine').to.equal(cuisine);
          expect(restaurant).to.have.property('dine_in').to.equal(dine_in);
          expect(restaurant).to.have.property('dine_outside').to.equal(dine_outside);
          expect(restaurant).to.have.property('pickup').to.equal(pickup);
          expect(restaurant).to.have.property('curbside_pickup').to.equal(curbside_pickup);
          expect(restaurant).to.have.property('delivery').to.equal(delivery);
          expect(restaurant).to.have.property('employee_capacity').to.equal(employee_capacity);
          expect(restaurant).to.have.property('customer_capacity').to.equal(customer_capacity);
          expect(restaurant).to.have.property('policy_notes').to.equal(policy_notes);
          expect(restaurant).to.have.property('number_tables').to.equal(number_tables);
          expect(restaurant).to.have.property('square_footage').to.equal(square_footage);
          expect(restaurant).to.have.property('customer_per_table').to.equal(customer_per_table);
          expect(restaurant).to.have.property('tables_distance').to.equal(tables_distance);
          expect(restaurant).to.have.property('_id');
          Restaurant.countDocuments({}, (_err, count) => {
            expect(count).to.equal(1);
          });
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
};
