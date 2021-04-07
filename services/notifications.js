const schedule = require('node-schedule');
const Notification = require('../models/Notification');

// schedule.scheduleJob('15 * * * * *', function (fireDate) {
//   console.log(
//     'This job was supposed to run at ' +
//       fireDate +
//       ', but actually ran at ' +
//       new Date()
//   );
// });

module.exports = {
  getNotifications: async () => {
    try {
      console.log('Getting notifications...');
      const notifs = await Notification.find();
      console.log(notifs);
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
