let express = require('express');
let router = express.Router();

const UserController = require("../controller/user/user_controller");

module.exports = {
    init(app) {
        app.get("/", (req, res) => {
            res.json({
                "data": {
                    "status": "ok",
                }
            });
        });

        // --- USERS ---

        router.get("/api/v1/users", UserController.get);

        router.get("/api/v1/users/:id", UserController.find);

        router.post("/api/v1/users", UserController.create);

        router.delete("/api/v1/users/:id", UserController.delete);

        app.use('/', router);
    }
};