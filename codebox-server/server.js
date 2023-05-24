const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/database");
const customerRoutes = require("./routes/customers");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());

// Add file upload
app.use(fileUpload());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads',express.static('public/uploads'));

// Register route 
// Address : localhost:5000/api/v1/customers
app.use("/api/v1/customers", customerRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`);
});