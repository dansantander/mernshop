import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(`MongoDB conected ${conn.connection.host}`);
  } catch(err) {
    console.log(`Error: ${err.message}`);
    // We exit the process and by passing 1 it means it's gonna
    // exit with failure
    process.exit(1);
  }
}

export default connectDB;