const schedule = require('node-schedule');
const moment = require('moment');
const Notification = require('../models/Notification');

module.exports = {
  getNotifications: async () => {
    try {
      console.log('Getting notifications...');
      const notifs = await Notification.find();
      console.log('Start scheduling...');
      notifs.forEach((noti) => {
        const start = moment(noti.start_time);
        const end = moment(noti.end_time);
        const dt = noti.interval;
        for (let i = start; i < end; i = i.add(dt, 'm')) {
          console.log(i.toDate());
        }

        // schedule.scheduleJob(noti.start_date_requested, (fireDate) => {
        //   console.log(
        //     'This job was supposed to run at ' +
        //       fireDate +
        //       ', but actually ran at ' +
        //       new Date()
        //   );
        // });
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
