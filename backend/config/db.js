import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://papewalysarr27:MamishMouha27@cluster0.viukv4f.mongodb.net/GAETA-RESTO')
        .then(() => console.log("DB connected"))
}