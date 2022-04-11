"use strict";
// REQUIRES ==============================================================
const { userService } = require("../services");

// CONTROLLERS ===========================================================
/**
 * Create User controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const userCreate = async (req, res, next) => {
    try {
        const data = await userService.userCreate(req.body);
        return res.send(data);
    } catch (error) {
        return next(error);
    }
};

/**
 * Update User controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const userUpdate = async (req, res, next) => {
    try {
        const data = await userService.updateUser(req.body);
        console.log('req.body1', req.body);
        return res.send(data);
    } catch (error) {
        return next(error);
    }
};

/**
 * User login controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const userLogin = async (req, res, next) => {
    try {
        const ip = req.headers["x-real-ip"] || req.socket.remoteAddress;
        const data = await userService.userLogin(req.body, ip);
        return res.send(data);
    } catch (error) {
        return next(error);
    }
};

/**
 * User get controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const userGet = async (req, res, next) => {
    try {
        const data = await userService.getAllUser(req.body);
        return res.send(data);
    } catch (error) {
        return next(error);
    }
};

/**
 * User logout controller
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const userLogout = async (req, res, next) => {
    try {
        const data = await userService.userLogout(req._userId);
        return res.send(data);
    } catch (error) {
        return next(error);
    }
};

// EXPORTS ================================================================
module.exports = {
    userCreate,
    userLogin,
    userUpdate,
    userGet,
    userLogout
};
