'use strict';

var _ = require('lodash');
var Payment = require('./payment.model');
var braintree = require("braintree");


// Get list of payments
exports.index = function(req, res) {
  Payment.find(function (err, payments) {
    if(err) { return handleError(res, err); }
    return res.json(200, payments);
  });
};

// Get a single payment
exports.show = function(req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    return res.json(payment);
  });
};

// Creates a new payment in the DB.
exports.create = function(req, res) {
  Payment.create(req.body, function(err, payment) {

    var gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: "w77sfpszccy6qv92",
      publicKey: "cqkhfmyzg75zqcxc",
      privateKey: "3824c734a726ea8e86557ccf87e2f58c"
    });

    var nonce = req.body.payment_method_nonce;

    console.log(nonce);

    gateway.transaction.sale({
      amount: '10.00',
      paymentMethodNonce: nonce,
    }, function (err, result) {
      console.log(err);
      console.log(result);
    });

    if(err) { return handleError(res, err); }
    return res.json(201, payment);
  });
};

// Updates an existing payment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Payment.findById(req.params.id, function (err, payment) {
    if (err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    var updated = _.merge(payment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, payment);
    });
  });
};

// Deletes a payment from the DB.
exports.destroy = function(req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    payment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}