const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const databaseConnection = () => {
    
    mongoose.connect(process.env.URI).then(() => {
        console.log("mongodb connected succesfully");
    }).catch((error) => {
        console.log(error);
    })
};
module.exports = databaseConnection;
