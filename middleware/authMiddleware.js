const jwt = require("jsonwebtoken");
const userUtils = require("../modules/users/userUtils");


const authMiddleware = async (req, res,next) => {
    try {
        const headers = req.headers.authorization;
        console.log(headers);
        if (!headers) {
            throw new Error(`Pls add authorization in headers`)
        }
        const token = headers.split(' ')[1];
        if (!token) {
            throw new Error("Token not available");
        }
        const jwtSecret = process.env.JWT_SECRET;
        const decryptToken = jwt.verify(token, jwtSecret);

        if ((decryptToken.exp - new Date().getTime()) > (60 * 1000)) {
            throw new Error(`Your Token Expired`);
        }
        const data = decryptToken.data;
        
        //check-user exist in db 
        const emailQuery = { user_email: data.userEmail };
        const userExist = await userUtils.getUserByQuery(emailQuery);
        if (!userExist) {
            throw new Error("user not exist");
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: "unauthorized access", message: error.message });
    }
}

module.exports = authMiddleware;