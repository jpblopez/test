const dotenv = require("dotenv");
const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/database");
const userRoutes = require("./routes/users");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
// Add file upload
app.use(fileUpload());

// Register route 
// Address : localhost:3000/api/users
app.use("/api/users", userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`);
});