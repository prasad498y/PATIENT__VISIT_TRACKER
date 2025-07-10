import React, { useState, useEffect } from 'react';
import { getPatients, createPatient } from '../api';

const PatientList = ({ onPatientCreated }) => {
  const [patients, setPatients] = useState([]);
  const [newPatientName, setNewPatientName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePatient = async () => {
    if (!newPatientName.trim()) return;

    const optimisticPatient = {
      id: `temp-${Date.now()}`,
      name: newPatientName.trim(),
    };

    setPatients((prevPatients) => [...prevPatients, optimisticPatient]);
    setNewPatientName('');
    setIsAdding(true);

    try {
      const response = await createPatient({ name: optimisticPatient.name });
      setPatients((prevPatients) =>
        prevPatients.map((p) =>
          p.id === optimisticPatient.id ? response.data : p
        )
      );
      if (onPatientCreated) {
        onPatientCreated();
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      setPatients((prevPatients) =>
        prevPatients.filter((p) => p.id !== optimisticPatient.id)
      );
      alert('Failed to add patient. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <h4 className="card-title mb-3">List</h4>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading patients...</span>
          </div>
        </div>
      ) : patients.length > 0 ? (
        <ul className="list-group mb-3">
          {patients.map((patient) => (
            <li key={patient.id} className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
              {patient.name}
              <span className="badge bg-success rounded-pill">ID: {patient.id}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No patients found. Add one below!</p>
      )}
      <div className="input-group">
        <input
          type="text"
          placeholder="New Patient Name"
          value={newPatientName}
          onChange={(e) => setNewPatientName(e.target.value)}
          className="form-control"
          disabled={isAdding}
        />
        <button
          onClick={handleCreatePatient}
          className="btn btn-success"
          disabled={isAdding || !newPatientName.trim()}
        >
          {isAdding ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Adding...
            </>
          ) : (
            'Add'
          )}
        </button>
      </div>
    </div>
  );
};

export default PatientList;