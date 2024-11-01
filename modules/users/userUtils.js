const userModel = require("../../schema/usersSchema");


const getUserByQuery = async (query) => {
    try {
        return await userModel.findOne(query)
    } catch (error) {
        console.log(error);
    }
}

module.exports.getUserByQuery = getUserByQuery