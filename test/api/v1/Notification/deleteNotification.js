const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

const user = {
	username: 'prasoon_deletenotification',
	email: 'delete_notification@gmail.com',
	password: 'abc123',
	confirmed_password: 'abc123',
	first_name: 'Prasoon',
	last_name: 'Sinha',
	phone_number: '604-111-1111',
};

const notification1 = {
	is_contact_email: true,
	contact: 'delete_notification@gmail.com',
	start_time: '2021-04-21T11:12:15.291Z',
	end_time: '2021-04-22T11:12:15.291Z',
	max_distance: 25,
	min_table_distance: 4,
	cuisine: 'American',
	dine_in: true
};

const notification2 = {
	is_contact_email: false,
	contact: '604-111-1111',
	start_time: '2021-04-21T11:12:15.291Z',
	end_time: '2021-04-22T11:12:15.291Z',
	max_distance: 25,
	min_table_distance: 4,
	cuisine: 'American',
	dine_in: true
};

const notification3 = {
	is_contact_email: false,
	contact: 'deletenotification3@gmail.com',
	start_time: '2021-04-21T11:12:15.291Z',
	end_time: '2021-04-22T11:12:15.291Z',
	max_distance: 25,
	min_table_distance: 4,
	cuisine: 'American',
	dine_in: true
};

const notification4 = {
	is_contact_email: false,
	contact: '604-111-1112',
	start_time: '2021-04-21T11:12:15.291Z',
	end_time: '2021-04-22T11:12:15.291Z',
	max_distance: 25,
	min_table_distance: 4,
	cuisine: 'American',
	dine_in: true
};


module.exports = deleteNotification = () => {
	describe('DELETE /notification', () => {
		let token;
		let id1;
		let id2;
		let id3;
		let id4;
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
					id1 = res.body._id
				});

			request(app)
				.post('/notifications')
				.use(prefix)
				.send(notification2)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					id2 = res.body._id
				});

			request(app)
				.post('/notifications')
				.use(prefix)
				.send(notification3)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					id3 = res.body._id
				});

			request(app)
				.post('/notifications')
				.use(prefix)
				.send(notification4)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					id4 = res.body._id
				});

			request(app)
				.post('/users')
				.use(prefix)
				.send(user)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					token = res.body.token;
					done();
				});
		});
		after((done) => {
			mongoose.connection.dropCollection('users', () => {
				mongoose.connection.dropCollection('notifications', () => {
					done();
				});
			});
		});

		it('1. should return success message if email notification successfully deleted', (done) => {
			request(app)
				.delete(`/notifications/${id1}`)
				.use(prefix)
				.set({ 'x-auth-token': token })
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.have.property('msg').to.equal('Notification deleted successfully!');
					done();
				});
		});

		it('2. should return success message if phone notification successfully deleted', (done) => {
			request(app)
				.delete(`/notifications/${id2}`)
				.use(prefix)
				.set({ 'x-auth-token': token })
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.have.property('msg').to.equal('Notification deleted successfully!');
					done();
				});
		});


		it('3. should return error if user attempts to delete same notification twice', (done) => {
			request(app)
				.delete(`/notifications/${id1}`)
				.use(prefix)
				.set({ 'x-auth-token': token })
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.statusCode).to.equal(404);
					expect(res.body).to.have.property('errors');
					expect(res.body.errors).to.have.lengthOf(1);
					expect(res.body.errors[0]).to.have.property('msg').to.equal('Notification not found!');
					done();
				});
		});

		it('4. should return error if user tries to delete email notification not belonging to them', (done) => {
			request(app)
				.delete(`/notifications/${id3}`)
				.use(prefix)
				.set({ 'x-auth-token': token })
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.statusCode).to.equal(400);
					expect(res.body).to.have.property('errors');
					expect(res.body.errors).to.have.lengthOf(1);
					expect(res.body.errors[0]).to.have.property('msg').to.equal('User not authorized to delete this notification!');
					done();
				});
		});

		it('5. should return error if user tries to delete phone notification not belonging to them', (done) => {
			request(app)
				.delete(`/notifications/${id4}`)
				.use(prefix)
				.set({ 'x-auth-token': token })
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.statusCode).to.equal(400);
					expect(res.body).to.have.property('errors');
					expect(res.body.errors).to.have.lengthOf(1);
					expect(res.body.errors[0]).to.have.property('msg').to.equal('User not authorized to delete this notification!');
					done();
				});
		});

		it('6. should return error message if no token is passed', (done) => {
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

		it('7. should return error message if invalid token is passed', (done) => {
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
