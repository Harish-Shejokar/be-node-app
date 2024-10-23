const router = require("express").Router();

router.get("/", (req, res) => {
    try {
        res.send({ message: "user first route" });
    } catch (error) {
        
    }
})

module.exports = router;
