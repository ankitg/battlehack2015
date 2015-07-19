'use strict';

var _ = require('lodash');
var Payment = require('./payment.model');
var braintree = require("braintree");
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "w77sfpszccy6qv92",
  publicKey: "cqkhfmyzg75zqcxc",
  privateKey: "3824c734a726ea8e86557ccf87e2f58c"
});

var Pusher = require('pusher');


// Get list of payments
exports.index = function(req, res) {
  console.log("fuck once");
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

exports.getToken = function(req, res) {
  gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "w77sfpszccy6qv92",
    publicKey: "cqkhfmyzg75zqcxc",
    privateKey: "3824c734a726ea8e86557ccf87e2f58c"
  });

  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });  
};

exports.initialize = function(req, res) {

  gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "w77sfpszccy6qv92",
    publicKey: "cqkhfmyzg75zqcxc",
    privateKey: "3824c734a726ea8e86557ccf87e2f58c"
  });



  var merchantAccountParams = {
    individual: {
      firstName: "Nikola",
      lastName: "GIRKE ",
      email: "test5@test.com",
      phone: "5553334444",
      dateOfBirth: "1981-11-19",
      ssn: "456-45-4567",
      address: {
        streetAddress: "111 Main St",
        locality: "Chicago",
        region: "IL",
        postalCode: "60622"
      }
    },
    funding: {
      descriptor: "GIRKE Nikola",
      destination: "email",
      email: "test5@test.com",
      mobilePhone: "5555555555",
      accountNumber: "1123581321",
      routingNumber: "071101307"
    },
    tosAccepted: true,
    masterMerchantAccountId: "7wyppn8k7gdjhpww",
    id: "GIRKE_Nikola"
  };

  gateway.merchantAccount.create(merchantAccountParams, function (err, result) {
    console.log(err);
    console.log(result);
    return res.json(200, result);
  });
};

exports.getPaymentsByAthleteMerchantId = function(req, res) {
  Payment.find({
      'braintree.transaction.merchantAccountId': req.params.id
    }, function (err, payments) {
    if(err) { return handleError(res, err); }
    if(!payments) { return res.send(404); }
    return res.json(payments);
  });
};

// Creates a new payment in the DB.
exports.create = function(req, res) {
  console.log(req.body);

  Payment.create(req.body, function(err, payment) {
    console.log(req.body);
    var nonce = req.body.payment_method_nonce;
    var merchant_id = req.body.merchant_id;
    var amount = req.body.amount;
    var sponsor = req.body.sponsor;
    var athlete = req.body.athlete;
    var fee = 2;


    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce, 
      merchantAccountId: merchant_id,
      serviceFeeAmount: fee
    }, function (err, result) {
      console.log(err);
      if(err) { return handleError(res, err); }

      console.log("Result from braintree:");
      console.log(result);
    
      payment.braintree = result;
      payment.status = 'processed';
      payment.save(function (err) {
        if (err) { return handleError(res, err); }

        var pusher = new Pusher({
          appId: '130201',
          key: '2b63159ac74d5e9407db',
          secret: 'c6897f2596d02eb9b2af',
          encrypted: true
        });
        pusher.port = 443;

        pusher.trigger(merchant_id, 'sponsor_event', {
          "message": "Congrats! " + sponsor.name + " sponsored you for $" + amount
        });

        return res.json(200, payment);
      });
    });

    if(err) { return handleError(res, err); }
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