const mongoose = require("mongoose");

// direct connection is not a good way i should use asyn fucntion to connect with database

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://dummymail0159_db_user:jFsG4QwLEaLigreb@cluster0.vjkhroq.mongodb.net/devTinder?retryWrites=true&w=majority"
    );
};

module.exports = connectDB;