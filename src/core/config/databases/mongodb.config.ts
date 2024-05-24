import mongoose from 'mongoose';

export function ConnectMongoDB(): void {
    let databaseURI: string = process.env.MONGODB_URL as string;
    mongoose.connect(databaseURI)
    .then(() => {
        console.log("✔ Database(MongoDB) connection has been established successfully!");
    })
    .catch((error:Error) => {
        console.log(error+"\n❌ Database connection failed..");
    })
  }