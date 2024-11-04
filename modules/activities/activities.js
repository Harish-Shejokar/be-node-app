const activitiesModel = require("../../schema/activitiesSchema");
const router = require("express").Router();


router.get("/", async (req, res, emailQuery) => {
    try {
        const data = await activitiesModel.find(emailQuery);
        res.send({ message: "activities data" , data});
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id", async (req, res) => {
    try {
        // console.log("get-one-------------");
        const { id } = req.params;
        const data = await activitiesModel.findOne({"_id":id});
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    try {
        // console.log("add-activity-------------");
        const body = req.body;
        const payload = {...body,}
        // console.log(body);
        await activitiesModel.create(body);
        // console.log(data);
        res.send({ message: "data added"});
    } catch (error) {
        console.log(error);
    }
})


router.put("/:id", async (req, res) => {
    try {
        // console.log("update-activity-------------");
        const body = req.body;
        const { id } = req.params;
        const filter = { "_id" :id };
        // console.log(body);
        await activitiesModel.findOneAndUpdate(filter,body);
        // console.log(data);
        res.send({ message: "data udpated"});
    } catch (error) {
        console.log(error);
    }
})


router.delete("/:id", async (req, res) => {
    try {
        // console.log("delete-activity-------------");
        const { id } = req.params;
        const filter = { "_id": id };
        await activitiesModel.findByIdAndDelete(filter);
        res.send({ message: "data deleted"});
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
