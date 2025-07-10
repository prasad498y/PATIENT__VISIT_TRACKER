import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getClinicians = () => axios.get(`${API_BASE_URL}/clinicians`);
export const createClinician = (data) => axios.post(`${API_BASE_URL}/clinicians`, data);

export const getPatients = () => axios.get(`${API_BASE_URL}/patients`);
export const createPatient = (data) => axios.post(`${API_BASE_URL}/patients`, data);

export const getVisits = (params) => axios.get(`${API_BASE_URL}/visits`, { params });
export const createVisit = (data) => axios.post(`${API_BASE_URL}/visits`, data);