const mongoose = require("mongoose");

const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = {
    connectDB
};