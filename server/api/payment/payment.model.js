'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  sponsor: {},
  athlete: Schema.Types.ObjectId,
  status: String,
  braintree: {}
});

module.exports = mongoose.model('Payment', PaymentSchema);