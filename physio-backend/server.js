require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');   
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboard');
const app = express();


app.use(express.json());

app.get('/',(req,res)=>{
    res.send("PMS IS RUNNING ON PORT");
});

app.use('/api/users',userRoutes);
app.use('/api/users',dashboardRoutes);

const PORT = process.env.PORT || 5000;
// Test DB connection and then start server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    return sequelize.sync(); // <-- this creates the tables
  })
  .then(() => {
    console.log('🧩 All models synced.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });