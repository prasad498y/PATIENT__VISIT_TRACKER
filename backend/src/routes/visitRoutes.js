const express = require('express');
const { createVisit, getVisits } = require('../controllers/visitController');
const router = express.Router();

router.post('/', createVisit);
router.get('/', getVisits);

module.exports = router;