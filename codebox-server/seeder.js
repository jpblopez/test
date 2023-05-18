const dotenv = require("dotenv");
const connectDB = require("./config/database");
const mongoose = require("mongoose");
const User = require("./models/User");

dotenv.config();

(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create an array of user data to be seeded
    const userData = [
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
        await User.deleteMany();

        // Insert the user data
        await User.insertMany(userData);

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
