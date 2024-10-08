const mongoose = require('mongoose')

const DB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error : ${error}`);
        process.exit(1);

    }
}

module.exports = DB;