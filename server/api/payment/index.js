'use strict';

var express = require('express');
var controller = require('./payment.controller');

var router = express.Router();

router.get('/', controller.index);
// router.get('/:id', controller.show);
router.get('/token', controller.getToken);
router.get('/initialize',controller.initialize);
router.get('/athleteMerchantId/:id',controller.getPaymentsByAthleteMerchantId);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;