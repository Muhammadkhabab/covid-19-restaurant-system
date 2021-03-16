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
      const harry = new User({
        username: 'harry165',
        email: 'harry@gmail.com',
        password: 'abc123',
        first_name: 'Harry',
        last_name: 'Le',
        phone_number: '604-312-1111',
      });
      expect(harry.isNew).to.be.true;
      harry
        .save()
        .then((user) => {
          expect(user).to.exist;
          expect(user.isNew).to.be.false;
          expect(user).to.have.property('username').to.equal('harry165');
          expect(user).to.have.property('email').to.equal('harry@gmail.com');
          expect(user).to.have.property('password').to.equal('abc123');
          expect(user).to.have.property('first_name').to.equal('Harry');
          expect(user).to.have.property('last_name').to.equal('Le');
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
