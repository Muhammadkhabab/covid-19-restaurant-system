const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

const user1 = {
	username: 'prasoon_getnotification1',
	email: 'prasoon_getnotification1@gmail.com',
	password: 'abc123',
	confirmed_password: 'abc123',
	first_name: 'Prasoon',
	last_name: 'Sinha',
	phone_number: '604-111-1111',
};

const user2 = {
	username: 'prasoon_getnotification2',
	email: 'prasoon_getnotification2@gmail.com',
	password: 'abc123',
	confirmed_password: 'abc123',
	first_name: 'Prasoon',
	last_name: 'Sinha',
	phone_number: '604-111-1112',
};

const user3 = {
	username: 'prasoon_getnotification3',
	email: 'prasoon_getnotification3@gmail.com',
	password: 'abc123',
	confirmed_password: 'abc123',
	first_name: 'Prasoon',
	last_name: 'Sinha',
	phone_number: '604-111-1113',
};


const notification1 = {
	is_contact_email: true,
	contact: 'prasoon_getnotification1@gmail.com',
	start_time: '2021-04-21T11:12:15.291Z',
	end_time: '2021-04-22T11:12:15.291Z',
	max_distance: 25,
	min_table_distance: 4,
	cuisine: 'American',
	dine_in: true
};

const notification2 = {
	is_contact_email: false,
	contact: '604-111-1112',
	start_time: '2021-04-21T11:12:15.291Z',
	end_time: '2021-04-22T11:12:15.291Z',
	max_distance: 25,
	min_table_distance: 4,
	cuisine: 'American',
	dine_in: true
};

const notification3a = {
	is_contact_email: true,
	contact: 'prasoon_getnotification3@gmail.com',
	start_time: '2021-04-21T11:12:15.291Z',
	end_time: '2021-04-22T11:12:15.291Z',
	max_distance: 25,
	min_table_distance: 4,
	cuisine: 'American',
	dine_in: true
};

const notification3b = {
	is_contact_email: false,
	contact: '604-111-1113',
	start_time: '2021-04-21T11:12:15.291Z',
	end_time: '2021-04-22T11:12:15.291Z',
	max_distance: 25,
	min_table_distance: 4,
	cuisine: 'American',
	dine_in: true
};

module.exports = getNotification = () => {
	describe('GET /notification (getNotification)', () => {
		let token1;
		let token2;
		let token3;
		const prefix = supertestPrefix('/api/v1');

		before((done) => {
			request(app)
				.post('/notifications')
				.use(prefix)
				.send(notification1)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
				});

			request(app)
				.post('/notifications')
				.use(prefix)
				.send(notification2)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
				});

			request(app)
				.post('/notifications')
				.use(prefix)
				.send(notification3a)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
				});

			request(app)
				.post('/notifications')
				.use(prefix)
				.send(notification3b)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
				});

			request(app)
				.post('/users')
				.use(prefix)
				.send(user1)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					token1 = res.body.token;

					request(app)
						.post('/users')
						.use(prefix)
						.send(user2)
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.end((err, res) => {
							if (err) return done(err);
							token2 = res.body.token;

							request(app)
								.post('/users')
								.use(prefix)
								.send(user3)
								.set('Accept', 'application/json')
								.expect('Content-Type', /json/)
								.end((err, res) => {
									if (err) return done(err);
									token3 = res.body.token;
									done();
								});
						});
				});
		});

		after((done) => {
			mongoose.connection.dropCollection('users', () => {
				mongoose.connection.dropCollection('notifications', () => {
					done();
				});
			});
		});


		it('1. should return notification when user signs up with an email', (done) => {
			request(app)
				.get('/notifications')
				.use(prefix)
				.set({ Accept: 'application/json', 'x-auth-token': token1 })
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.have.lengthOf(1);
					const {
						is_contact_email,
						contact,
						start_time,
						end_time,
						max_distance,
						min_table_distance,
						cuisine,
						dine_in
					} = notification1
					expect(res.body[0]).to.have.property('is_contact_email').to.equal(is_contact_email);
					expect(res.body[0]).to.have.property('contact').to.equal(contact);
					expect(res.body[0]).to.have.property('start_time').to.equal(start_time);
					expect(res.body[0]).to.have.property('end_time').to.equal(end_time);
					expect(res.body[0])
						.to.have.property('max_distance')
						.to.equal(max_distance);
					expect(res.body[0]).to.have.property('min_table_distance').to.equal(min_table_distance);
					expect(res.body[0]).to.have.property('cuisine').to.equal(cuisine);
					expect(res.body[0]).to.have.property('dine_in').to.equal(dine_in);
					expect(res.body[0]).to.have.property('_id');
					done();
				});
		});

		it('2. should return notification when user signs up with phone number', (done) => {
			request(app)
				.get('/notifications')
				.use(prefix)
				.set({ Accept: 'application/json', 'x-auth-token': token2 })
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.have.lengthOf(1);
					const {
						is_contact_email,
						contact,
						start_time,
						end_time,
						max_distance,
						min_table_distance,
						cuisine,
						dine_in
					} = notification2
					expect(res.body[0]).to.have.property('is_contact_email').to.equal(is_contact_email);
					expect(res.body[0]).to.have.property('contact').to.equal(contact);
					expect(res.body[0]).to.have.property('start_time').to.equal(start_time);
					expect(res.body[0]).to.have.property('end_time').to.equal(end_time);
					expect(res.body[0])
						.to.have.property('max_distance')
						.to.equal(max_distance);
					expect(res.body[0]).to.have.property('min_table_distance').to.equal(min_table_distance);
					expect(res.body[0]).to.have.property('cuisine').to.equal(cuisine);
					expect(res.body[0]).to.have.property('dine_in').to.equal(dine_in);
					expect(res.body[0]).to.have.property('_id');
					done();
				});
		});

		it('3. should return multiple notifications if applicable to a user', (done) => {
			request(app)
				.get('/notifications')
				.use(prefix)
				.set({ Accept: 'application/json', 'x-auth-token': token3 })
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.have.lengthOf(2);
					const count = res.body.length;
					const notifs = [notification3a, notification3b]
					for (let i = 0; i < count; i++) {
						const {
							is_contact_email,
							contact,
							start_time,
							end_time,
							max_distance,
							min_table_distance,
							cuisine,
							dine_in
						} = notifs[i]
						expect(res.body[i]).to.have.property('is_contact_email').to.equal(is_contact_email);
						expect(res.body[i]).to.have.property('contact').to.equal(contact);
						expect(res.body[i]).to.have.property('start_time').to.equal(start_time);
						expect(res.body[i]).to.have.property('end_time').to.equal(end_time);
						expect(res.body[i])
							.to.have.property('max_distance')
							.to.equal(max_distance);
						expect(res.body[i]).to.have.property('min_table_distance').to.equal(min_table_distance);
						expect(res.body[i]).to.have.property('cuisine').to.equal(cuisine);
						expect(res.body[i]).to.have.property('dine_in').to.equal(dine_in);
						expect(res.body[i]).to.have.property('_id');
					}
					done();
				});
		});

		it('4. should return error message if no token is passed', (done) => {
			request(app)
				.get('/notifications')
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

		it('5. should return error message if invalid token is passed', (done) => {
			request(app)
				.get('/notifications')
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
}