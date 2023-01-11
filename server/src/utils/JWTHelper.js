import options from "../../config.json" assert { type: "json" };
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

const signJWT = (payload) => {
    const data = {
        id: payload
    }

    return sign(data, options.jwtSecret);
}
export const SignJWT = signJWT;

const verifyJWT = (payload) => {
    try {
        return verify(payload, options.jwtSecret);
    } catch (error) {
        return false;
    }
}
export const VerifyJWT = verifyJWT;