const expect = require('chai').expect;
const User = require('../../../models/User');

module.exports = create = () => {
  describe('#create', () => {
    it('should return errors for mandatory fields', (done) => {
      const user = new User();
      user.validate((err) => {
        expect(err.errors.username).to.exist;
        expect(err.errors.email).to.exist;
        expect(err.errors.password).to.exist;
        expect(err.errors.first_name).to.exist;
        expect(err.errors.last_name).to.exist;
        expect(err.errors.phone_number).to.exist;
      });
      done();
    });

    it('should save a valid user', (done) => {
      const data = {
        username: 'khoa165_modelcreate',
        email: 'khoa165_modelcreate@gmail.com',
        password: 'abc123',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      };
      const {
        username,
        email,
        password,
        first_name,
        last_name,
        phone_number,
      } = data;
      const harry = new User(data);
      expect(harry.isNew).to.be.true;
      harry
        .save()
        .then((user) => {
          expect(user).to.exist;
          expect(user.isNew).to.be.false;
          expect(user).to.have.property('username').to.equal(username);
          expect(user).to.have.property('email').to.equal(email);
          expect(user).to.have.property('password').to.equal(password);
          expect(user).to.have.property('first_name').to.equal(first_name);
          expect(user).to.have.property('last_name').to.equal(last_name);
          expect(user).to.have.property('phone_number').to.equal(phone_number);
          expect(user).to.have.property('_id');
          expect(user).to.have.property('restaurant_id');
          expect(user).to.have.property('is_admin').to.be.false;
          expect(user).to.have.property('is_staff').to.be.false;
          expect(user).to.have.property('is_developer').to.be.false;
          expect(user).to.have.property('is_customer').to.be.true;
          User.countDocuments({}, (_err, count) => {
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
