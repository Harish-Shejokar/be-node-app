const { default: mongoose } = require("mongoose");

const router = require("express").Router();

const userSchema = new mongoose.Schema({
    user_id : {type : Number},
    user_name: { type: String, required: true },
    description: { type: String, required: true },
})

const userModel = mongoose.model("users" ,userSchema );


router.get("/", (req, res) => {
    try {
        
        res.send({ message: "user first route" });
    } catch (error) {
        
    }
})

module.exports = router;
