const subscribe = require('./subscribe');
const getNotification = require('./getNotification');
const deleteNotification = require('./deleteNotification');

module.exports = user = () => {
	describe('Notification routes', () => {
		subscribe();
		getNotification();
		deleteNotification();
	});
};