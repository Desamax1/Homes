import { VerifyJWT } from "../utils/JWTHelper.js";

const authUser = async (req, res, next) => {
    const token = VerifyJWT(req.cookies.token);

    if (!token) {
        return res.status(401).json({
            message: "You have to be logged in to do that!"
        });
    }

    res.locals.user = {
        id: token.id
    };
    next();
}
export const AuthUser = authUser;