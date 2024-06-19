import mongoose from 'mongoose';
import UserModel from '../model/UserModel.js';
import bcrypt from 'bcrypt'


export const attendanceUpdate = async (req, res) => {
    const { id } = req.params;
    const { adminStatus, role, attendance } = req.body;

    if (role === "Secretary" || adminStatus === true) {
        try {
            // Find the user by ID
            const user = await UserModel.findById(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the attendance date is already in the array
            const attendanceExists = user.attendance.some(date => 
                new Date(date).getTime() === new Date(attendance).getTime()
            );

            let updatedUser;

            if (attendanceExists) {
                // Remove the attendance date if it exists
                updatedUser = await UserModel.findByIdAndUpdate(
                    id,
                    { $pull: { attendance: new Date(attendance) } },
                    { new: true }
                ).select('-password');
            } else {
                // Add the attendance date if it does not exist
                updatedUser = await UserModel.findByIdAndUpdate(
                    id,
                    { $addToSet: { attendance: new Date(attendance) } },
                    { new: true }
                ).select('-password');
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(400).json({ message: "You can only update attendance as a Secretary or an admin" });
    }
};


export const attendance = async (req, res) => {
    const { attendance } = req.body;

    try {
        // Retrieve all users
        const users = await UserModel.find();
        let userArray = [];

        // Iterate over each user and check their attendance array
        for (let user of users) {
            const attendanceExists = user.attendance.some(date => 
                new Date(date).getTime() === new Date(attendance).getTime()
            );

            if (attendanceExists) {
                userArray.push(user);
            }
        }

        if (userArray.length > 0) {
            // Return all users whose attendance includes the specified date
            return res.status(200).json(userArray);
        } else {
            // If no user's attendance matches the date
            return res.status(404).json({ message: "Attendance not found in any user" });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// {
// 	"role": "Secretary",
//     "attendance": ["2023-05-20T00:00:00.000Z"]
// }


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
// 		"_id": "664a2a37a440dd0da8de66a8",
// 		"email": "treasure@gmail.com",
// 		"firstname": "Moses",
// 		"lastname": "Boy",
// 		"isExcos": false,
// 		"isAdmin": false,
// 		"attendance": [],
// 		"__v": 0,
// 		"role": "doctor"
// 	},
// 	{
// 		"_id": "664a2c10f2582782d9830936",
// 		"email": "bo@gmail.com",
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
// 		"attendance": [
// 			"2023-06-20T00:00:00.000Z"
// 		],
// 		"__v": 0
// 	}
// ]