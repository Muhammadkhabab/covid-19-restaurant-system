const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  current_customers: {
    type: Number,
    require: true,
  },
  current_employees: {
    type: Number,
    require: true,
  },
  current_free_tables: {
    type: Number,
    require: true,
  },
});

module.exports = Record = mongoose.model('record', RecordSchema);
