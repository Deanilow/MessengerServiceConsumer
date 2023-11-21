const handleHttpError = (res, message = "algo Sucedio", code = 403) => {
    res.status(code);
    res.send({ error: message });
};

module.exports = { handleHttpError };