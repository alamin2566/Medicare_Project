import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://alaminhossainm272_db_user:RuJ5i77T42yks3Gz@cluster0.effq5fm.mongodb.net/Medicare")
    .then(() => {
        console.log("Database connected successfully");
    })
}