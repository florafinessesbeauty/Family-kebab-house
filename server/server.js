const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

// Database connection and server startup
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database models
    await sequelize.sync({ alter: false }); // Use existing tables
    console.log('Database models synchronized.');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();