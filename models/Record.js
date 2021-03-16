const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
  },

  created_at: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7,
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
  aggregated: {
    type: Boolean,
    default: false,
  },
});

RecordSchema.index({ created_at: 1 }, { expireAfterSeconds: 120 });

module.exports = Record = mongoose.model('record', RecordSchema);
