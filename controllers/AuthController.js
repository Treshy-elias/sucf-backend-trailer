import UserModel  from '../model/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Registering a new User 

export const registerUser = async (req, res) => {
    const {email, firstname, lastname, password, pin, role} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    let excos
    let admin
    if (pin === '5243') {
         excos = true
    }

    else if (pin === '9465') {
         admin = true
    }
    else if (!pin) {
        admin = false
        excos = false
    }
    else {
        admin = false
        excos = false
        return res.status(400).send('Incorrect pin')
    }

        try {
            const user = await UserModel.findOne({email: email})
            if (!user) {
                const newUser = new UserModel({email, firstname, lastname, password: hashedPass, isAdmin: admin, isExcos: excos, role },)
                await newUser.save()
                res.status(200).json(newUser)
            }
                else {
                    return res.status(400).send('Email already exist')
            }
    }
  catch (error) {
    res.status(500).json({message: error.message })
}



}
export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const validity = await bcrypt.compare(password, user.password);
  
        if (validity) {
          const token = jwt.sign({ id: user._id, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });
          res.status(200).json({ token, user });
        } else {
          res.status(400).json("Wrong Password");
        }
      } else {
        res.status(400).json("User not found");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



// // Secret key for JWT (You should store this in an environment variable)
// const JWT_SECRET = 'yourSecretKey'; // Replace with your secret key

// export const LoginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await UserModel.findOne({ email: email });
//     if (user) {
//       const validity = await bcrypt.compare(password, user.password);

//       if (validity) {
//         // Create JWT payload
//         const payload = {
//           user: {
//             id: user.id,
//             email: user.email
//           }
//         };

//         // Sign the token
//         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token });
//       } else {
//         res.status(400).json("Wrong Password");
//       }
//     } else {
//       res.status(400).json("User not found");
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

