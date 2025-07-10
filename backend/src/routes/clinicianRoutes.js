const express = require('express');
const { createClinician, getClinicians } = require('../controllers/clinicianController');
const router = express.Router();

router.post('/', createClinician);
router.get('/', getClinicians);

module.exports = router;