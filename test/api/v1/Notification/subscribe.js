// This file tests the subscribe function in the notification controller.
// The subscribe function is called when a user wants to create a new
// notification via the POST route in the notification routes file.

const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

module.exports = subscribe = () => {
  describe('POST /notifications (subscribe)', () => {
    const prefix = supertestPrefix('/api/v1');

    before((done) => {
      mongoose.connection.dropCollection('notifications', () => {
        done();
      });
    });

    after((done) => {
      mongoose.connection.dropCollection('notifications', () => {
        done();
      });
    });

    it('1. should return error because request of the body was incorrect (had missing fields)', (done) => {
      const notification1 = {
        is_contact_email: true,
        start_time: '2021-04-21T11:12:15.291Z',
        end_time: '2021-04-22T11:12:15.291Z',
        max_distance: 25,
        min_table_distance: 4,
        cuisine: 'American',
        dine_in: true,
      };

      request(app)
        .post('/notifications')
        .use(prefix)
        .send(notification1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Missing contact!');
          expect(res.body.errors[0])
            .to.have.property('param')
            .to.equal('contact');
          done();
        });
    });

    it('2. should return error because start date of subscription in the past', (done) => {
      const notification2 = {
        is_contact_email: true,
        contact: 'sinhaprasoon_subscribe2@gmail.com',
        start_time: '2021-03-15T11:12:15.291Z',
        end_time: '2021-04-22T11:12:15.291Z',
        max_distance: 25,
        min_table_distance: 4,
        cuisine: 'American',
        dine_in: true,
      };

      request(app)
        .post('/notifications')
        .use(prefix)
        .send(notification2)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Start time cannot be in the past!');
          done();
        });
    });

    it('3. should return error because end date of subscription before start date', (done) => {
      const notification3 = {
        is_contact_email: true,
        contact: 'sinhaprasoon_subscribe3@gmail.com',
        start_time: '2021-05-21T11:12:15.291Z',
        end_time: '2021-05-20T11:12:15.291Z',
        max_distance: 25,
        min_table_distance: 4,
        cuisine: 'American',
        dine_in: true,
      };

      request(app)
        .post('/notifications')
        .use(prefix)
        .send(notification3)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('End time must be later than start time!');
          done();
        });
    });

    it('4. should return errors because there were multiple missing fields', (done) => {
      const notification4 = {
        start_time: '2021-05-21T11:12:15.291Z',
        max_distance: 25,
        min_table_distance: 4,
        cuisine: 'American',
        dine_in: 3,
      };

      request(app)
        .post('/notifications')
        .use(prefix)
        .send(notification4)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(4);
          const msgs = [
            [
              'is_contact_email',
              'Missing information about if contact is email or phone number!',
            ],
            ['contact', 'Missing contact!'],
            ['end_time', 'Missing end time!'],
            ['dine_in', 'Dine in must be boolean value!'],
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

    it('5. should return error because user did not pick from dine_in, dine_outside, pickup, curbside, or delivery', (done) => {
      const notification5 = {
        is_contact_email: true,
        contact: 'sinhaprasoon_subscribe5@gmail.com',
        start_time: '2021-05-21T11:12:15.291Z',
        end_time: '2021-05-22T11:12:15.291Z',
        max_distance: 25,
        min_table_distance: 4,
        cuisine: 'American',
      };

      request(app)
        .post('/notifications')
        .use(prefix)
        .send(notification5)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Enter at least one option for dining experience!');
          done();
        });
    });

    it('6. should return the notification when notification is created!', (done) => {
      const notification6 = {
        is_contact_email: true,
        contact: 'sinhaprasoon_subscribe6@gmail.com',
        start_time: '2021-05-21T11:12:15.291Z',
        end_time: '2021-05-22T11:12:15.291Z',
        max_distance: 25,
        min_table_distance: 4,
        cuisine: 'American',
        dine_in: true,
      };

      request(app)
        .post('/notifications')
        .use(prefix)
        .send(notification6)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          const {
            is_contact_email,
            contact,
            start_time,
            end_time,
            max_distance,
            min_table_distance,
            cuisine,
            dine_in,
          } = notification6;
          expect(res.body)
            .to.have.property('is_contact_email')
            .to.equal(is_contact_email);
          expect(res.body).to.have.property('contact').to.equal(contact);
          expect(res.body).to.have.property('start_time').to.equal(start_time);
          expect(res.body).to.have.property('end_time').to.equal(end_time);
          expect(res.body)
            .to.have.property('max_distance')
            .to.equal(max_distance);
          expect(res.body)
            .to.have.property('min_table_distance')
            .to.equal(min_table_distance);
          expect(res.body).to.have.property('cuisine').to.equal(cuisine);
          expect(res.body).to.have.property('dine_in').to.equal(dine_in);
          expect(res.body).to.have.property('_id');
          done();
        });
    });
  });
};
