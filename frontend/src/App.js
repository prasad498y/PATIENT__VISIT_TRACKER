import React, { useState } from 'react';
import ClinicianList from './components/ClinicianList';
import PatientList from './components/PatientList';
import VisitForm from './components/VisitForm';
import VisitList from './components/VisitList';
import './App.css';

function App() {
  const [refreshVisits, setRefreshVisits] = useState(0);
  const [refreshClinicians, setRefreshClinicians] = useState(0);
  const [refreshPatients, setRefreshPatients] = useState(0);    

  const handleVisitCreated = () => {
    setRefreshVisits(prev => prev + 1);
  };

  const handleClinicianCreated = () => {
    setRefreshClinicians(prev => prev + 1);
  };

  const handlePatientCreated = () => { 
    setRefreshPatients(prev => prev + 1);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary app-title">
        Patient Visit Tracker
      </h1>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">Clinicians</div>
            <div className="card-body">
              {}
              <ClinicianList onClinicianCreated={handleClinicianCreated} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">Patients</div>
            <div className="card-body">
              {}
              <PatientList onPatientCreated={handlePatientCreated} />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-5">
        <div className="card-header">Record New Visit</div>
        <div className="card-body">
          {}
          <VisitForm
            onVisitCreated={handleVisitCreated}
            refreshCliniciansTrigger={refreshClinicians}
            refreshPatientsTrigger={refreshPatients}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header">Patient Visits</div>
        <div className="card-body">
          <VisitList refreshTrigger={refreshVisits} />
        </div>
      </div>
    </div>
  );
}

export default App;