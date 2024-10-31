const userRouter = require("./modules/users/users");
const activityRouter = require("./modules/activities/activities");

const setupRoutes = (app) => {
    app.use(`/users`, userRouter);
    app.use(`/activities`, activityRouter)
}

module.exports = setupRoutes;