const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

type ConnectionObject = {
  isConnect?: number;
};

const connection: ConnectionObject = {};
async function dbConnect(): Promise<void> {
  if (connection.isConnect) {
    console.log("Already connected to the database.");
    return;
  }
  try {
    if (process.env.MONGO_URL) {
      const db = await mongoose.connect(process.env.MONGO_URL!, {});
      connection.isConnect = db.connections[0].readyState;
      console.log("Database connected successfully.");
    } else {
      console.log("envirovariable n malyo ene.");
    }
  } catch (err) {
    console.log("Database connection failed", err);
    process.exit(1);
  }
}
export default dbConnect;
