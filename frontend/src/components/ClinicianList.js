import React, { useState, useEffect } from 'react';
import { getClinicians, createClinician } from '../api';

const ClinicianList = ({ onClinicianCreated }) => {
  const [clinicians, setClinicians] = useState([]);
  const [newClinicianName, setNewClinicianName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchClinicians();
  }, []);

  const fetchClinicians = async () => {
    setIsLoading(true);
    try {
      const response = await getClinicians();
      setClinicians(response.data);
    } catch (error) {
      console.error('Error fetching clinicians:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClinician = async () => {
    if (!newClinicianName.trim()) return;

    const optimisticClinician = {
      id: `temp-${Date.now()}`,
      name: newClinicianName.trim(),
    };

    setClinicians((prevClinicians) => [...prevClinicians, optimisticClinician]);
    setNewClinicianName('');
    setIsAdding(true);

    try {
      const response = await createClinician({ name: optimisticClinician.name });
      setClinicians((prevClinicians) =>
        prevClinicians.map((c) =>
          c.id === optimisticClinician.id ? response.data : c
        )
      );
      if (onClinicianCreated) { 
        onClinicianCreated();
      }
    } catch (error) {
      console.error('Error creating clinician:', error);
      setClinicians((prevClinicians) =>
        prevClinicians.filter((c) => c.id !== optimisticClinician.id)
      );
      alert('Failed to add clinician. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <h4 className="card-title mb-3">List</h4>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading clinicians...</span>
          </div>
        </div>
      ) : clinicians.length > 0 ? (
        <ul className="list-group mb-3">
          {clinicians.map((clinician) => (
            <li key={clinician.id} className="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
              {clinician.name}
              <span className="badge bg-primary rounded-pill">ID: {clinician.id}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No clinicians found. Add one below!</p>
      )}
      <div className="input-group">
        <input
          type="text"
          placeholder="New Clinician Name"
          value={newClinicianName}
          onChange={(e) => setNewClinicianName(e.target.value)}
          className="form-control"
          disabled={isAdding}
        />
        <button
          onClick={handleCreateClinician}
          className="btn btn-primary"
          disabled={isAdding || !newClinicianName.trim()}
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

export default ClinicianList;