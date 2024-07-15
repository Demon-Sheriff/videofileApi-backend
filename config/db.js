const mongoose = require('mongoose');
const {Sequelize} = require('sequelize');

// using sequelize as the DB
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3',
    logging: false,
})

sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch((err) => {
    console.error('Error synchronizing database:', err);
});

const connectDB = async () => {

    try {
        await mongoose.connect('mongodb+srv://devandy44:MJLKiDDciBgmmuEA@cluster04.sval3ig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster04', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tlsInsecure: true 
        });

        console.log('MongoDB connected');
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}



module.exports = sequelize;