import dotenv from 'dotenv';
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import userSchema from "./users/user.schema";
import productSchema from "./products/product.schema";
import { ConnectMongoDB } from "./core/config/databases/mongodb.config";

dotenv.config();

const readJSONFile = (absolutePath: string): any => {
  try {
    const data = fs.readFileSync(absolutePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return null;
  }
};

const seedData = async () => {
  try {
    ConnectMongoDB();
    // const jsonData = readJSONFile(path.join(__dirname, "../seeds/users.seed.json"));
    const jsonData = readJSONFile(path.join(__dirname, "../seeds/products.seed.json"));

    if (jsonData) {
      // const result = await userSchema.insertMany(jsonData);
      const result = await productSchema.insertMany(jsonData);
      console.log(`${result.length} documents inserted`);
    }

    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

// Call the seedData function to start seeding
seedData();
