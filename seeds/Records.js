const Record = require('../models/Record');
const moment = require('moment');

const generateNumber = (lower, upper) => {
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const generateRecord = async (rid, doffset = null, hoffset = null) => {
  const day = doffset ? doffset : generateNumber(1, 7);
  const time = hoffset
    ? {
        hours: hoffset,
        minutes: 5,
      }
    : {
        hours: generateNumber(1, 24),
        minutes: generateNumber(1, 60),
        seconds: generateNumber(1, 60),
      };

  const record = {
    restaurant_id: rid,
    created_at: moment().subtract(day, 'days').add(time).toISOString(),
    current_customers: generateNumber(20, 40),
    current_employees: generateNumber(3, 15),
    current_free_tables: generateNumber(3, 20),
  };

  return record;
};

module.exports = {
  generateRecords: async (num, rid) => {
    if (num <= 0) {
      return;
    }
    return new Promise(async (resolve) => {
      console.log('Generating fake records...');

      const data = [];
      for (let i = 0; i < num; i++) {
        const record = await generateRecord(rid);
        data.push(record);
      }
      await Record.insertMany(data);

      console.log(`${num} fake records generated!`);
      return resolve();
    });
  },

  generateDaysRecords: async (day, rid) => {
    if (day <= 0) {
      return;
    }
    return new Promise(async (resolve) => {
      console.log('Generating fake records...');

      const data = [];
      for (let d = day; d >= 1; d--) {
        for (let h = 1; h <= 24; h++) {
          const record = await generateRecord(rid, d, h);
          data.push(record);
        }
      }
      await Record.insertMany(data);

      console.log(`${day * 24} fake records generated!`);
      return resolve();
    });
  },

  generateRecordsMultipleRestaurants: async (rids) => {
    if (rids.length <= 0) {
      return;
    }
    return new Promise(async (resolve) => {
      console.log('Generating fake records...');

      const data = [];
      for (let i = 0; i < rids.length; i++) {
        for (let d = 7; d >= 1; d--) {
          for (let h = 1; h <= 24; h++) {
            const record = await generateRecord(rids[i], d, h);
            data.push(record);
          }
        }
      }
      await Record.insertMany(data);

      console.log(`${rids.length * 7 * 24} fake records generated!`);
      return resolve();
    });
  },
};
