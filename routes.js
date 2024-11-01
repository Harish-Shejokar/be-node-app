const userRouter = require("./modules/users/users");
const activityRouter = require("./modules/activities/activities");
const authMiddleware = require("./middleware/authMiddleware");

const setupRoutes = (app) => {
    app.use(`/users`, userRouter);
    app.use(`/activities`, authMiddleware ,activityRouter)
}

module.exports = setupRoutes;