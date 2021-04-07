const schedule = require('node-schedule');
const Notification = require('../models/Notification');

module.exports = {
  getNotifications: async () => {
    try {
      console.log('Getting notifications...');
      const notifs = await Notification.find();
      console.log('Start scheduling...');
      notifs.forEach((noti) => {
        schedule.scheduleJob(noti.start_date_requested, (fireDate) => {
          console.log(
            'This job was supposed to run at ' +
              fireDate +
              ', but actually ran at ' +
              new Date()
          );
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },
};
