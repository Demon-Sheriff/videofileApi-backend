const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        await mongoose.connect('mongodb+srv://devandy44:MJLKiDDciBgmmuEA@cluster04.sval3ig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster04', {

        });

        console.log('MongoDB connected');
    }
    catch(err){

        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;