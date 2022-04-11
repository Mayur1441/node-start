"use strict";
// REQUIRES ===============================================================
const md5 = require("md5");
const { userModel } = require("../models");
const {
    ER_USERNAME_ALREADY_EXISTS,
    ER_DOCUMENT_NOT_FOUND,
    ER_WRONG_PASSWORD
} = require("../constants/errorMessaegs.constants");
const { generateUserToken } = require( "../helpers/jwt" );

// METHODS ================================================================
/**
 * Insert one new user
 * @param {*} body
 * @returns
 */
const insertOneUser = async (body) => {
    const userData = new userModel(body);
    return await userData.save();
};

/**
 * Find one user
 * @param {*} filter
 * @returns
 */
const findOneUser = async (filter) => {
    return await userModel.findOne(filter).lean();
};

/**
 * Get all user
 * @param {*} filter
 * @returns
 */
const getAllUser = async (filter) => {
    return await userModel.find(filter).lean();
};

/**
 * Update one user
 * @param {*} filter 
 * @param {*} reflection 
 * @returns 
 */
const updateOneUser = async ( filter, reflection ) => {
    const options = { upsert: false, returnOriginal: false };
    return await userModel.findOneAndUpdate( filter, reflection, options );
}

/**
 * Count number of users
 * @param {*} filter 
 * @returns 
 */
const countUsers = async (filter) => {
    return await userModel.countDocuments(filter);
};

// SERVICES ===============================================================
/**
 * User create service
 * @param {*} body
 * @returns
 */
const userCreate = async (body) => {
    const filter = { username: body.username };

    if (await countUsers(filter)) throw ER_USERNAME_ALREADY_EXISTS;

    body.password = md5(body.password);
    return await insertOneUser(body);
};

/**
 * User login service
 * @param {*} body
 * @param {*} ip
 * @returns 
 */
const userLogin = async (body, ip) => {
    const filter = { username: body.username };

    const data = await findOneUser(filter);
    if( !data ) throw ER_DOCUMENT_NOT_FOUND(`User ${body.username}`);
    
    const password = md5( body.password );
    if( password !== data.password ) throw ER_WRONG_PASSWORD;

    const token = generateUserToken(data._id, ip);
    const reflection = { $set: { token } };

    const response = await updateOneUser( filter, reflection );
    return { token: response.token };
}

/**
 * User logout service.
 * @param {*} _userId 
 * @returns 
 */
const userLogout = async (_userId) => {
    const filter = { _id: _userId };

    const data = await findOneUser(filter);
    if( !data ) throw ER_DOCUMENT_NOT_FOUND(`User ${_userId}`);

    const reflection = { $set: { token: null } }
    
    await updateOneUser( filter, reflection );
    return {};
}

// EXPORTS =================================================================
module.exports = {
    findOneUser,
    userCreate,
    getAllUser,
    userLogin,
    userLogout
};
