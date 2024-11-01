const router = require("express").Router();
const userModel = require("../../schema/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const encryptPassword =  async (password) => {
    const saltRound = 10;
    const saltPass = await bcrypt.genSalt(saltRound);
    const newPassword = await bcrypt.hash(password, saltPass);
    console.log(newPassword);
    return newPassword;
}

const signupValidation = async (payload) => {
    const userName = payload.user_name;
    const userEmail = payload.user_email;
    const password = payload.password;

    if (userName == `` || userName == undefined) {
        throw new Error(`Enter valid UserName`);
    }

    if (userEmail == `` || userEmail == undefined) {
        throw new Error(`Enter valid Email`);
    }

    if (password == `` || password == undefined) {
        throw new Error(`Enter valid password`);
    }

    //check-user-exist  
    const userExist = await userModel.findOne({ user_email: userEmail });
    if (userExist) {
        throw new Error(`Email Already Exist`);
    }

    //encrypt-password before storing into db
    payload.password = await encryptPassword(password);

}

const loginValidation = async (payload) => {
    const userEmail = payload?.user_email;
    const password = payload?.password;

    if (userEmail == `` || userEmail == undefined) {
        throw new Error(`Enter valid Email`);
    }

    //check-user-exist  
    const userExist = await userModel.findOne({ user_email: userEmail });
    if (!userExist) {
        throw new Error(`User Not exist`);
    }

    // password-validation
    const hashedPass = userExist.password;
    const passwordMatched = await bcrypt.compare(password, hashedPass);
   
    if (!passwordMatched) {
        throw new Error(`Entered Wrong Password`);
    }

    return userExist;
}


const createAuthToken = async (payload) => {
    const jwtSecret = process.env.JWT_SECRET;
    const userInfo = { userEmail: payload.user_email };
    const toeknExpireTime = Math.floor(Date.now() / 1000 + (30 * 60));
    const token = await jwt.sign({
        exp : toeknExpireTime,
        data :userInfo
    }, jwtSecret)
    console.log(token);
    return token;
}


router.post("/signup", async (req, res) => {
    try {
        const { body } = req;
        //validation
        await signupValidation(body);
        //creating new-user
        await userModel.create(body);
        res.send({ message: "New-User SignUp Successfully" });
    } catch (error) {
        console.log(error)
        res.send({"message": error.message})
    }
})

router.post("/login", async (req, res) => {
    try {
        const { body } = req;
        //validation and return user
        const user = await loginValidation(body);
        const authToken = await createAuthToken(body);
        res.send({ user});
    } catch (error) {
        console.log(error)
        res.send({"message": error.message})
    }
})


module.exports = router;
