const Visit = require('../models/Visit');
const Clinician = require('../models/Clinician');
const Patient = require('../models/Patient');

exports.createVisit = async (req, res) => {
  try {
    const visit = await Visit.create(req.body);
    res.status(201).json(visit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVisits = async (req, res) => {
  try {
    const { clinicianId, patientId } = req.query;
    let whereClause = {};

    if (clinicianId) {
      whereClause.clinicianId = clinicianId;
    }
    if (patientId) {
      whereClause.patientId = patientId;
    }

    const visits = await Visit.findAll({
      where: whereClause,
      include: [
        { model: Clinician, attributes: ['name'] },
        { model: Patient, attributes: ['name'] },
      ],
      order: [['timestamp', 'DESC']],
    });
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};