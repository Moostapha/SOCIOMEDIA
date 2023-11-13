import mongoose from "mongoose";

// Schema setup for model User
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        
        password: {
            type: String,
            required: true,
            min: 5,
        },
        
        picturePath: {
            type: String,
            default: '',
        },
        
        friends: {
            type: Array,
            default: [],
        },
        
        location: String,
        occupation: String,
        viewedProfile: Number,
        impression: Number,
    },
    
    {timestamps: true}
);

// Initialisation du model User avec le Schema de user UserSchema
const User = mongoose.model('User', UserSchema);

// Exportation pour usage vers controllers 
export default User;