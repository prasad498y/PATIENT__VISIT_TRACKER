import React, { useState, useEffect } from 'react';
import { getVisits, getClinicians, getPatients } from '../api';

const VisitList = ({ refreshTrigger }) => {
  const [visits, setVisits] = useState([]);
  const [clinicians, setClinicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [filterClinician, setFilterClinician] = useState('');
  const [filterPatient, setFilterPatient] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [refreshTrigger, filterClinician, filterPatient]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [visitsRes, cliniciansRes, patientsRes] = await Promise.all([
        getVisits({ clinicianId: filterClinician, patientId: filterPatient }),
        getClinicians(),
        getPatients(),
      ]);
      setVisits(visitsRes.data);
      setClinicians(cliniciansRes.data);
      setPatients(patientsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4 className="card-title mb-4">Recent Visits</h4>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label htmlFor="filterClinician" className="form-label fw-bold">Filter by Clinician:</label>
          <select
            id="filterClinician"
            value={filterClinician}
            onChange={(e) => setFilterClinician(e.target.value)}
            className="form-select"
          >
            <option value="">All Clinicians</option>
            {clinicians.map((clinician) => (
              <option key={clinician.id} value={clinician.id}>
                {clinician.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="filterPatient" className="form-label fw-bold">Filter by Patient:</label>
          <select
            id="filterPatient"
            value={filterPatient}
            onChange={(e) => setFilterPatient(e.target.value)}
            className="form-select"
          >
            <option value="">All Patients</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading visits...</span>
            </div>
          </div>
        ) : visits.length > 0 ? (
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Clinician</th>
                <th scope="col">Patient</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <tr key={visit.id}>
                  <td>{new Date(visit.timestamp).toLocaleString()}</td>
                  <td>{visit.Clinician ? visit.Clinician.name : 'N/A'}</td>
                  <td>{visit.Patient ? visit.Patient.name : 'N/A'}</td>
                  <td>{visit.notes || <span className="text-muted fst-italic">No notes</span>}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info text-center mt-4" role="alert">
            No visits found with the current filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitList;