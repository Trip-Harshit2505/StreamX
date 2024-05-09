const express = require("express")
const dotenv = require("dotenv");
const databaseConnection  = require("./utils/database.js");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/userRoute.js");
const LikedRoutes = require("./routes/likedRoute.js");
const cors = require("cors");

databaseConnection();

dotenv.config({
    path:".env"
})

const app = express();

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

//api
app.use("/api/v1/user", UserRoutes)
app.use("/api/v1/liked", LikedRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server listen at port ${process.env.PORT}`);
})