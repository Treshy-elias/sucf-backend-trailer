import mongoose from 'mongoose';
import UserModel from '../model/UserModel.js';
import bcrypt from 'bcrypt'


export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password'); // Exclude the password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const user = await UserModel.findById(id);

        if (user) {
            const {password, ...otherDetails} = user._doc 

            res.status(200).json(otherDetails);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const Updateuser = async (req, res) => {
    const {id} = req.params
    const {currentUserId, adminStatus, password} = req.body
    if (id === currentUserId || adminStatus === true) {
        try {
            if (password) {
                const salt = bcrypt.genSalt(10)
                req.body.password =  bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true}).select('-password')
            
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    else {
        res.status(400).json("You can only update your page")
    }
}


export const DeleteUser = async (req, res) => {
    const {id} = req.params
    const {currentUserId, adminStatus} = req.body
    if (id === currentUserId || adminStatus === true) {
        try {

            const deletedUser = await UserModel.findByIdAndDelete(id)
            if (!deletedUser) {
                return res.status(400).json({message: "User not found"})
            }
            res.status(200).json("User deleted")
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    else {
        res.status(400).json("You can only delete your page")
    }
}






















// [
// 	{
// 		"_id": "664a22a467fad626c1add8e4",
// 		"email": "treasure@gmail.com",
// 		"firstname": "Treasure",
// 		"lastname": "Audu",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a238467fad626c1add8e6",
// 		"email": "treasure@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Bliss",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a2573713d0e5bfba6d6ca",
// 		"email": "treasure@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Bob",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a275e0e4b56fe626ce227",
// 		"email": "treasure@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boby",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [
// 			"2023-05-20T00:00:00.000Z"
// 		],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a2a37a440dd0da8de66a8",
// 		"email": "treasure@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boby",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a2a3fa440dd0da8de66aa",
// 		"email": "treasure@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boby",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a2c10f2582782d9830936",
// 		"email": "bo@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boby",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a32647543b3f8857bf8c2",
// 		"email": "b@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boby",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a350f6b3dbb01d6daf7bc",
// 		"email": "yy@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boby",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a36eee7c698cfd67e3fc5",
// 		"email": "yotube@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boby",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	},
// 	{
// 		"_id": "664a3ede60dbb709683743c7",
// 		"email": "ube@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boy",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0
// 	}
// ]