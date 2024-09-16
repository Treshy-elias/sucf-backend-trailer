import UserModel  from '../model/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Registering a new User 

export const registerUser = async (req, res) => {
    const { email, firstname, lastname, password, pin, isExcos, role } = req.body;

    let hashedPass;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPass = await bcrypt.hash(password, salt);
    }

    let admin = false;
     if (pin === '9465') {
        admin = true;
    } else if (pin) {
        return res.status(400).send('Incorrect pin');
    }

    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            const newUser = new UserModel({
                email,
                firstname,
                lastname,
                password: hashedPass || null, // Include hashedPass only if it's defined
                isAdmin: admin,
                isExcos,
                role
            });

            await newUser.save();
            res.status(200).json(newUser);
        } else {
            return res.status(400).send('Email already exists');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
