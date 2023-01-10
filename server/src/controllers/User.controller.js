import Users from "../models/User.model.js";
import { HashChecker, HashGenerator } from "../utils/PasswordHelper.js";

const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            name: req.params.id
        });

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
            createdAt: Date.now(),
            lastSeen: Date.now(),
            phoneNumber,
            hash,
            salt,
            listings: []
        });

        if (!user) {
            throw "Error during user creation!";
        }

        return res.status(200).json({
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
            // TODO: Set cookie
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