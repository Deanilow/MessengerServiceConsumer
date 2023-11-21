const express = require("express");
const fs = require("fs")
const path = require("path")
const router = express.Router();
const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if (name !== 'index') {
        const pathDirectory = path.join(PATH_ROUTES, file);
        if (fs.statSync(pathDirectory).isFile() && pathDirectory.endsWith('.js')) {
            router.use(`/${name}`, require(`./${file}`)) 
        }
    }
})

module.exports = router;