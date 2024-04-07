const express = require('express');
const apiRoutes = require('./routes/api.route'); // Import your API routes
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api', apiRoutes); // Mount your API routes under the /api prefix

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
