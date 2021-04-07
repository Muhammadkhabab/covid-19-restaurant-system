const schedule = require('node-schedule');
const moment = require('moment');
const Notification = require('../models/Notification');
const { searchRestaurants } = require('./search');

module.exports = {
  getNotifications: async () => {
    try {
      console.log('Getting notifications...');
      const notifs = await Notification.find();
      console.log('Start scheduling...');
      notifs.forEach((noti) => {
        const {
          start_time,
          end_time,
          interval,
          max_distance,
          min_table_distance,
          cuisine,
          dine_in,
          dine_outside,
          pickup,
          curbside,
          delivery,
          max_employees,
          max_customers,
          min_tables,
          percent_capacity,
        } = noti;

        const res = searchRestaurants({
          cuisine,
          dine_in,
          dine_outside,
          pickup,
          curbside,
          delivery,

          tables_distance: min_table_distance,
          current_free_tables: min_tables,
          current_percent_capacity: percent_capacity,
          max_employees,
          max_customers,
        });

        console.log(res.count);

        const start = moment(start_time);
        const end = moment(end_time);
        const dt = interval;
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
