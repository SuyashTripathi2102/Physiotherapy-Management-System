const Patient = require('../models/Patient');
const moment = require('moment');
const User = require('../models/User'); 
const { Op } = require('sequelize'); 

const createPatient = async (req, res) => {
  try {
    const {
        name,
        age,
        gender,
        contact,
        email,
        address,
        medicalHistory,
        subscription_start,
        subscription_end,
        isActive,
        doctor_id: bodyDoctorId
      } = req.body;

    let doctorId ;
    const loggedInUser = req.userInfo;
    console.log(loggedInUser);
    if (loggedInUser.role === 'doctor') {
        doctorId  = loggedInUser.id;
    } else if (loggedInUser.role === 'admin') {
        // Admin must pass a doctor_id in body
        if (!bodyDoctorId) {
            return res.status(400).json({ success: false, message: 'Doctor ID required when admin creates patient' });
        }
        doctorId  = bodyDoctorId;
    }

    // Check for existing patient (based on email or contact)
    const existingPatient = await Patient.findOne({
        where: {
            doctor_id: doctorId, // Ensure the patient belongs to the same doctor
          [Op.or]: [
            // //Op.or is a special Sequelize operator used to create an OR condition in SQL queries.
            //Sequelize uses Op (short for Operators) to safely write SQL-style conditions using JS objects.
            { email },
            { contact },
            {
              [Op.and]: [
                { name },
                { contact }
              ]
            }
          ]
        }
      });
  
      if (existingPatient) {
        return res.status(409).json({
          success: false,
          message: 'Patient already exists with the same email or contact number'
        });
      }
  
    const newPatient = await Patient.create({
        name,
        age,
        gender,
        contact,
        email,
        address,
        medical_history: medicalHistory,
        subscription_start,
        subscription_end,
        isActive,
        doctor_id: doctorId
      });
    // Now use doctor_id to create the patient
    res.status(201).json({ success: true, data: newPatient });
} catch (error) {
  console.error('Create Patient Error:', error);
  res.status(500).json({ success: false, message: 'Failed to create patient', error: error.message });
}
};

// Get all patients
const getAllPatients = async (req, res) => {
    try {
      const userRole = req.userInfo.role;
      const userId = req.userInfo.id;
  
      let patients;
  
      if (userRole === 'admin') {
        patients = await Patient.findAll({
          order: [['subscription_end', 'ASC']], 
        }); // Get all patients
      } else if (userRole === 'doctor') {
        patients = await Patient.findAll({
          where: { doctor_id: userId },
          order: [['subscription_end', 'ASC']], 
        }); // Only doctor's patients
      }else {
        return res.status(403).json({ success: false, message: 'Access Denied: Unauthorized Role' });
      }
      const today = moment();

        const updatedPatients = patients.map((patient) => {
        const endDate = moment(patient.subscription_end);
        const startDate = moment(patient.subscription_start);

        const daysLeft = endDate.diff(today, 'days');
        const hasStarted = today.isSameOrAfter(startDate);

        let subscriptionStatus = 'active';
        let statusColor = 'green'; // default

        if (!hasStarted) {
        subscriptionStatus = 'not_started';
        statusColor = 'blue'; // or yellow
        } else if (endDate.isBefore(today, 'day')) {
        subscriptionStatus = 'expired';
        statusColor = 'gray';
        } else if (daysLeft <= 5) {
        subscriptionStatus = 'expiring';
        statusColor = 'red';
        }
        
        return {
        //patient.toJSON() - Converts the Sequelize model instance into a plain JavaScript object.
        //Removes all the extra Sequelize stuff like .save(), .update() etc.
        //You get only the raw data from the DB.

        //... (spread) - Spreads the key-value pairs from that plain object into the new object.
        //So it's like copying all patient fields (like id, name, subscription_start, etc.) into the return object.
        ...patient.toJSON(),
        daysLeft,
        subscriptionStatus, // can be used on frontend to highlight (red/grey)
        statusColor, // can be used on frontend to highlight (red/grey)
      };
    });

    res.status(200).json({ success: true, data: updatedPatients });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching patients', error: error.message });
  }
};

//search patients
// This function allows doctors and admins to search for patients by name, email, or contact number.
const searchPatients = async (req, res) => {
    try {
      const { query } = req.query;
      const role = req.userInfo.role;
      const userId = req.userInfo.id;
  
      if (!query) {
        return res.status(400).json({ success: false, message: 'Search query required' });
      }
  
      const whereClause = {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
          { contact: { [Op.like]: `%${query}%` } },
        ]
      };
  
      if (role === 'doctor') {
        whereClause.doctor_id = userId; // only their patients
      }
  
      const results = await Patient.findAll({ where: whereClause });

        //Handle if no patients found
        if (results.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No patients found with the given query'
        });
        }
  
      res.status(200).json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Search failed', error: error.message });
    }
};

// GET /patients/:id
const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const role = req.userInfo.role;
    const userId = req.userInfo.id;

    const whereClause = { id: patientId };

    if (role === 'doctor') {
      whereClause.doctor_id = userId; // Ensure doctor can only view their own patient's details
    }

    const patient = await Patient.findOne({ where: whereClause });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch patient details',
      error: error.message,
    });
  }
};

//Patient History (Static for now)
const getPatientHistory = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the patient info
      const patient = await Patient.findByPk(id, {
        attributes: ['id', 'name', 'age', 'email', 'contact'] // only general info
      });
  
      if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient not found' });
      }
  
      // Static history
      const dummyHistory = [
        { date: '2025-04-01', note: 'Initial assessment done. Knee pain observed.' },
        { date: '2025-04-03', note: 'Assigned basic exercises for flexibility.' },
        { date: '2025-04-05', note: 'Improved range of motion noted.' }
      ];
  
      res.status(200).json({
        success: true,
        data: {
          patient: patient.toJSON(),
          history: dummyHistory
        }
      });
    } catch (error) {
      console.error('Patient history fetch error:', error);
      res.status(500).json({
        success: false,
        message: 'Could not fetch history',
        error: error.message
      });
    }
  };

module.exports = { createPatient, getAllPatients, searchPatients , getPatientHistory , getPatientById};
