const express = require('express');
let DbConnection = require("./src/module/db/connection");
let appRoutes = require("./src/config/routes");

DbConnection.initDb();

const app = express();

app.use(express.json())

process.on('unhandledRejection', error => {
    if (error.stack) {
        console.error(error.message);
        console.error(error.stack);
    }
});

const port = 8000;

appRoutes.init(app);

app.listen(port, () => {
    console.log('App started on port: ' + port);
});

module.exports = {
    getApp() {
        return app;
    }
};