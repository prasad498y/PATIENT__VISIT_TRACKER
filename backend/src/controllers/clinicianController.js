const Clinician = require('../models/Clinician');

exports.createClinician = async (req, res) => {
  try {
    const clinician = await Clinician.create(req.body);
    res.status(201).json(clinician);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClinicians = async (req, res) => {
  try {
    const clinicians = await Clinician.findAll();
    res.status(200).json(clinicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};