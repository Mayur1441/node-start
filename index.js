"use strict";
/**
 * Requires
 */
const { appConfg } = require("./config");
const express = require("express");
const http = require("http");
const cors = require("cors");
const routes = require("./src/routes");
const logger = require("./src/helpers/logger");
const {
    apiResponseMiddleware,
    apiNotFoundMiddleware,
    errorHandlerMiddleware,
} = require("./src/middleware");

/**
 * MongoDB Connection
 */
require("./src/includes/mongodb.connection");

/**
 * Masala
 */
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(apiResponseMiddleware);
app.use(`/${appConfg.apiVersion}`, routes);
app.use(apiNotFoundMiddleware);
app.use(errorHandlerMiddleware);

/**
 * Server Initiation
 */
server.listen(appConfg.port, () => {
    logger.info(
        `${appConfg.project} service is listening to the port ${appConfg.port}.`
    );
});
