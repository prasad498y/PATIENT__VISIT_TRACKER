# Patient Visit Tracker
This web application allows internal users to track patient visits by clinicians. It consists of a Node.js backend with an SQLite database and a React frontend.

## Features
### Backend
- Create and retrieve clinicians.
- Create and retrieve patients.
- Record new visits, linking to both clinician and patient
- List visits in reverse chronological order, with optional filtering by clinician or patient
### Frontend
- Displays lists of clinicians and patients.
- Provides a form to create new visits.
- Displays a table of all recorded visits
- Allows filtering of visits by clinician or patient.

## Local setup instructions

### Install the following software

* Node.js
* Git

### Steps

1.  Clone this repo and go into the `PATIENT__VISIT_TRACKER` folder.
    git clone https://github.com/prasad498y/PATIENT__VISIT_TRACKER.git
    cd PATIENT__VISIT_TRACKER

2.  Install dependencies from main folder
    npm run install-all

3.  Go into the `backend` folder. Create a `.env` file there with these lines
    cd backend
    PORT=5000
    DB_FILE=./database.sqlite

4.  From the main folder, run
    cd ..
    npm start

### Access

* Backend API: `http://localhost:5000`
* Frontend App: `http://localhost:3000`

## Viewing Database Data

To inspect the `database.sqlite` file, use this tool **DB Browser for SQLite**.