require('dotenv').config();

const mongodb = require('mongoose');
const URI =`${process.env.DB_CONNECTION_STRING}`;

const connectDB = async() => {
    mongodb.connect(URI, {useNewUrlParser: true});

    const db = mongodb.connection;
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
}


module.exports = {
    connectDB,
};