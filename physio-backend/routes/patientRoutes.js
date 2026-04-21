const express = require('express');
const {createPatient,getAllPatients,searchPatients,getPatientHistory ,getPatientById} = require('../controllers/patient-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const authorizeRoles = require('../middlewares/roles-middleware');
const router = express.Router();

//add new paitent if u are doctor u can directly add paitent but for in case of admin
//admin have to provide the doctor id while creating the new paitent 
router.post('/add-patient', authMiddleware, authorizeRoles('doctor', 'admin'),createPatient);

// Get All Patients
router.get('/all-patients',authMiddleware,authorizeRoles('doctor', 'admin'),getAllPatients);

// Search Patients
// GET /api/patients/search?query=xyz
router.get('/search', authMiddleware, authorizeRoles('doctor', 'admin'), searchPatients);

// Get Patients History
// GET /api/patients/:id/history
router.get('/:id/history', authMiddleware, authorizeRoles('doctor', 'admin'), getPatientHistory);

// Get Patient by ID
// GET /api/patients/:id
router.get('/:id', authMiddleware, authorizeRoles('doctor', 'admin'), getPatientById);

module.exports = router;


