// middleware that will check if the user is authorized
// for now it just runs the next function
const authUser = async (req, res, next) => {
    res.locals.user = {
        id: req.body.id
    };
    next();
}
export const AuthUser = authUser;