const dotenv = require("dotenv");
const connectDB = require("./config/database");
const mongoose = require("mongoose");
const Customer = require("./models/Customer");

dotenv.config();

(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create an array of user data to be seeded
    const customerData = [
      {
        name: "John Doe",
        imagePath: "/images/john.jpg",
      },
      {
        name: "Jane Smith",
        imagePath: "/images/jane.jpg",
      },
      // Add more user objects here as needed
    ];

    // Function to seed the database
    const seedDatabase = async () => {
      try {
        // Clear existing users
        await Customer.deleteMany();

        // Insert the user data
        await Customer.insertMany(userData);

        console.log("Database seeded successfully");
        process.exit(0); // Exit the script
      } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1); // Exit the script with an error
      }
    };

    // Call the seedDatabase function
    await seedDatabase();
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the script with an error
  }
})();
