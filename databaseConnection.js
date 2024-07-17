const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

function DbConnection() {
    const DB_URL = process.env.MONGO_URI;

    if (!DB_URL) {
        console.error("MongoDB URI is not defined. Please set MONGO_URI in your .env file.");
        process.exit(1); // Exit the process with an error
    }

    mongoose.connect(DB_URL);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", function () {
    console.log("DB Connected!!");
});

module.exports = DbConnection;

// Call the function for testing
DbConnection();
