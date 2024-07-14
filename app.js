const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://devandy44:MJLKiDDciBgmmuEA@cluster04.sval3ig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster04', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true 
});

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Connection Successful');
});
connection.on('error', () => {
    console.log('Connection unsuccessful');
});

// Schema for products
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    }
});

// Create the model
const pModel = mongoose.model('Product', schema); // Use singular model name

// POST request for products
app.post('/products', async (req, res) => {
    try {
        const product = await pModel.create(req.body); // Directly use req.body

        // Log the received product
        console.log(product);

        // Respond with the created product
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create product' });
    }
});

// GET request for home
app.get('/home', (req, res) => {
    console.log("logged to home");
    res.send("Welcome to the home route!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
