"use strict";

// REQUIRES ================================================================
const mongoose = require("mongoose");
const { USERS } = require("../../constants/mongodbCollections.constants");

// SCHEMA ==================================================================
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default: null,
        },
        token: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// EXPORTS ==================================================================
module.exports = mongoose.model(USERS, UserSchema);
