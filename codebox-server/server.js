const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
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

// Register route 
// Address : localhost:3000/api/customers
app.use("/api/customers", customerRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`);
});