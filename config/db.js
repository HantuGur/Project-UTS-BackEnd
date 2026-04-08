const mongoose = require('mongoose');

const connectDB = async () => {mongodb+srv://oliviancerlindo:olivian00@cluster0.fhqw8dn.mongodb.net/?appName=Cluster0
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
