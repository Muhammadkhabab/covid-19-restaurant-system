const schedule = require('node-schedule');
const moment = require('moment');
const Notification = require('../models/Notification');
const { searchRestaurants } = require('./search');
const { sendEmail } = require('./email');

module.exports = {
  getNotifications: async () => {
    try {
      console.log('Getting notifications...');
      const notifs = await Notification.find();
      console.log('Start scheduling...');
      notifs.forEach(async (noti) => {
        const {
          contact,
          is_contact_email,
          start_time,
          end_time,
          interval,
          // max_distance,
          min_table_distance,
          cuisine,
          dine_in,
          dine_outside,
          pickup,
          curbside_pickup,
          delivery,
          max_employees,
          max_customers,
          min_tables,
          percent_capacity,
        } = noti;

        const start = moment(start_time);
        const end = moment(end_time);
        const dt = Math.max(interval, 15);

        for (let i = start; i < end; i = i.add(dt, 'm')) {
          schedule.scheduleJob(i.toDate(), async () => {
            console.log(i.toDate());
            const data = await searchRestaurants({
              cuisine,
              dine_in,
              dine_outside,
              pickup,
              curbside_pickup,
              delivery,

              tables_distance: min_table_distance,
              current_free_tables: min_tables,
              current_percent_capacity: percent_capacity,
              max_employees,
              max_customers,
            });

            if (is_contact_email) {
              console.log('Count: ' + data.restaurants.length);
              sendEmail(contact, data.restaurants);
            }
          });
        }
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

  scheduleNotification: async (noti) => {
    const {
      contact,
      is_contact_email,
      start_time,
      end_time,
      interval,
      min_table_distance,
      cuisine,
      dine_in,
      dine_outside,
      pickup,
      curbside_pickup,
      delivery,
      max_employees,
      max_customers,
      min_tables,
      percent_capacity,
    } = noti;

    const start = moment(start_time);
    const end = moment(end_time);
    const dt = Math.max(interval, 15);

    for (let i = start; i < end; i = i.add(dt, 'm')) {
      schedule.scheduleJob(i.toDate(), async () => {
        console.log(i.toDate());
        const data = await searchRestaurants({
          cuisine,
          dine_in,
          dine_outside,
          pickup,
          curbside_pickup,
          delivery,

          tables_distance: min_table_distance,
          current_free_tables: min_tables,
          current_percent_capacity: percent_capacity,
          max_employees,
          max_customers,
        });

        if (is_contact_email) {
          console.log('Count: ' + data.restaurants.length);
          sendEmail(contact, data.restaurants);
        }
      });
    }
  },
};
