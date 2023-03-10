import Users from "../models/User.model.js";
import { SignJWT } from "../utils/JWTHelper.js";
import { HashChecker, HashGenerator } from "../utils/PasswordHelper.js";

const getUser = async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: "Invalid user id!"
            });
        }

        const user = await Users.findById(req.params.id, '-hash -salt -_id -__v -email -phoneNumber');

        if (!user) {
            return res.status(404).json({
                message: "User not fonud!"
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const GetUser = getUser;

const addUser = async (req, res) => {
    try {
        const { username, password, email, phoneNumber } = req.body;
    
        if (!username || !password || !email || !phoneNumber) {
            return res.status(400).json({
                message: "You have to submit all fields (username, password, email and phoneNumber)"
            });
        }

        const { hash, salt } = HashGenerator(password);

        const user = await Users.create({
            username,
            email,
            phoneNumber,
            hash,
            salt,
            listings: []
        });

        if (!user) {
            throw "Error during user creation!";
        }

        return res.status(201).json({
            message: "User successfully created",
            id: user.id
        });
    } catch (error) {
        if (error.code === 11000) {
            // already exists
            return res.status(400).json({
                message: `A user with that ${Object.keys(error.keyValue)} already exists!`
            });
        }

        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const AddUser = addUser;

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: "The user with the inserted username or password does not exist!"
            });
        }

        const { hash, salt } = user;

        if (HashChecker(password, hash, salt)) {
            // password ok
            res.cookie("token", SignJWT(user.id), {
                httpOnly: true
            });

            await Users.findByIdAndUpdate(user.id, {
                lastSeen: Date.now()
            });
            return res.status(200).json({
                message: "User logged in"
            });
        } else {
            return res.status(400).json({
                message: "The user with the inserted username or password does not exist!"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const LoginUser = loginUser;

const updateUser = async (req, res) => {
    try {
        const newUser = {};
        const { username, email, password, phoneNumber } = req.body;

        if (username) {
            newUser.username = username;
        }
        if (email) {
            newUser.email = email;
        }
        if (phoneNumber) {
            newUser.phoneNumber = phoneNumber;
        }
        if (password) {
            const { hash, salt } = HashGenerator(password);
            newUser.hash = hash;
            newUser.salt = salt;
        }

        if (Object.keys(newUser).length <= 0) {
            return res.status(400).json({
                message: "You have to specify at least one field that you wish to update!"
            });
        }

        await Users.findByIdAndUpdate(res.locals.user.id, newUser);

        return res.status(200).json({
            message: "User updated successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const UpdateUser = updateUser;

const removeUser = async (req, res) => {
    try {
        await Users.findByIdAndDelete(res.locals.user.id);

        res.clearCookie("token");

        return res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const RemoveUser = removeUser;

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        
        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error has occured!"
        });
    }
}
export const LogoutUser = logoutUser;