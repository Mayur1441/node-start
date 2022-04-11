"use strict";

// REQUIRES =====================================================================
const mongoose = require("mongoose");
const {mongo} = require("../../config");
const logger = require("../helpers/logger");

/**
 * Mongodb connection
 */
if (process.env.Current_Run == 1) {
    const mongodbConnectionUrl = `mongodb${mongo.port ? "" : "+srv"}://${
        mongo.username
    }:${mongo.password}@${mongo.host}${
        mongo.port ? ":".concat(mongo.port.toString()) : ""
    }/${mongo.dbName}`;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin",
    };
    // CONNECTION ====================================================================
    mongoose
        .connect(mongodbConnectionUrl, options)
        .then(() => {
            logger.info(`Mongodb connection done`);
        })
        .catch((err) => {
            logger.error(`Mongodb error`, err);
            process.exit(1);
        });
} else {
    const mongodbConnectionUrl = process.env.DB_HOST;
    // CONNECTION ====================================================================
    mongoose
        .connect(mongodbConnectionUrl)
        .then(() => {
            logger.info(`Mongodb connection done`);
        })
        .catch((err) => {
            logger.error(`Mongodb error`, err);
            process.exit(1);
        });
}
