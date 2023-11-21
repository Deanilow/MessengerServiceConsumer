const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateMessage = [
    check("to")
        .exists()
        .notEmpty(),
    check("from")
        .exists()
        .notEmpty(),
    check("body")
        .isArray()
        .notEmpty(),
    check("body.*.text")
        .exists()
        .notEmpty(),
    check("file")
        .isArray()
        .notEmpty(),
    check("file.*.fileUrl")
        .exists()
        .notEmpty(),
    check("createdBy")
        .exists()
        .notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetMessage = [
    check("id")
        .exists()
        .notEmpty(),

    (req, res, next) => validateResults(req, res, next)
];

const validatorGetAllByStatus = [
    check("status")
        .exists()
        .notEmpty(),

    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorCreateMessage, validatorGetMessage, validatorGetAllByStatus };