const express = require('express');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

// use middleware
app.use(express.json());

// establish db connection with sequelise
require('./config/db')

// routing
app.use('/api/videos', videoRoutes);

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT}`);
});