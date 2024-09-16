import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    birthday: {
        type: String
    },
    role: {
        type: String
    },
    homeAdd: {
        type: String
    },
    ImageUrl: {
        type: String
    },
    schAdd: {
        type: String
    },
    gender: {
        type: String
    },
    department: {
        type: String
    },
    currentLev: {
        type: String
    },
    isExcos: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    attendance: [
        {
            type: Date
        }
    ]
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
