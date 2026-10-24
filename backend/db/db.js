import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: 'rsc2027' });
        console.log("MongoDB Connected for RSC 2027...");
    } catch (e) {
        console.log("MongoDB Connection Error:", e);
    }
}

export default connectDB;
