const {mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    password  : {type :String, requried: true},
},
    {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;