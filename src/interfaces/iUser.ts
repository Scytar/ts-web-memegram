import mongoose from "mongoose";

export default interface User{
    _id: mongoose.Types.ObjectId,
    user: {
        name: String,
        email: String,
        password: Number
    },
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
}