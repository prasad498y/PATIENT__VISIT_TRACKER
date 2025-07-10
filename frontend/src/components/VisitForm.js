import React, { useState, useEffect } from 'react';
import { createVisit, getClinicians, getPatients } from '../api';

const VisitForm = ({ onVisitCreated, refreshCliniciansTrigger, refreshPatientsTrigger }) => {
  const [clinicians, setClinicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedClinician, setSelectedClinician] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    fetchCliniciansAndPatients();
  }, [refreshCliniciansTrigger, refreshPatientsTrigger]);

  const fetchCliniciansAndPatients = async () => {
    setIsLoading(true);
    try {
      const cliniciansRes = await getClinicians();
      setClinicians(cliniciansRes.data);
      if (!selectedClinician && cliniciansRes.data.length > 0) {
        setSelectedClinician(cliniciansRes.data[0].id);
      } else if (selectedClinician && !cliniciansRes.data.some(c => c.id === selectedClinician)) {
        setSelectedClinician(cliniciansRes.data.length > 0 ? cliniciansRes.data[0].id : '');
      }

      const patientsRes = await getPatients();
      setPatients(patientsRes.data);
      if (!selectedPatient && patientsRes.data.length > 0) {
        setSelectedPatient(patientsRes.data[0].id);
      } else if (selectedPatient && !patientsRes.data.some(p => p.id === selectedPatient)) {
        setSelectedPatient(patientsRes.data.length > 0 ? patientsRes.data[0].id : '');
      }

    } catch (error) {
      console.error('Error fetching data for visit form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClinician || !selectedPatient) {
      alert('Please select a clinician and a patient.');
      return;
    }
    setIsRecording(true);
    try {
      await createVisit({
        clinicianId: selectedClinician,
        patientId: selectedPatient,
        notes,
      });
      setNotes('');
      onVisitCreated();
    } catch (error) {
      console.error('Error creating visit:', error);
      alert('Failed to record visit. Please try again.');
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h4 className="card-title mb-4">New Record</h4>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading form data...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="clinician" className="form-label fw-bold">Clinician:</label>
            <select
              id="clinician"
              value={selectedClinician}
              onChange={(e) => setSelectedClinician(e.target.value)}
              className="form-select form-select-lg"
              disabled={isRecording}
            >
              {clinicians.length > 0 ? (
                clinicians.map((clinician) => (
                  <option key={clinician.id} value={clinician.id}>
                    {clinician.name}
                  </option>
                ))
              ) : (
                <option value="">No clinicians available</option>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="patient" className="form-label fw-bold">Patient:</label>
            <select
              id="patient"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="form-select form-select-lg"
              disabled={isRecording}
            >
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))
              ) : (
                <option value="">No patients available</option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="form-label fw-bold">Notes:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              className="form-control"
              disabled={isRecording}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={isRecording || !selectedClinician || !selectedPatient}
          >
            {isRecording ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Recording...
              </>
            ) : (
              'Record Visit'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default VisitForm;