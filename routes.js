const userRouter = require("./modules/users/users");

const setupRoutes = (app) => {
    app.use(`/users`, userRouter);
}

module.exports = setupRoutes;