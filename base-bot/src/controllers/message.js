const { messagesModel, messagesDetailBodyModel, messagesDetailFileModel } = require("../model");
const { handleHttpError } = require("../middleware/handleHttpError")
const { matchedData } = require("express-validator")
const { getFormattedDateWithOffset } = require("../utils")
const { adapterProvider51900262844 } = require("../bot-whatsapp/bot.51900262844");
const { adapterProvider51917641085 } = require("../bot-whatsapp/bot.51917641085");

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await messagesModel.findAll({})
        res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }
}


/**
 * Obtener lista Segun Estado de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItemsByStatus = async (req, res) => {
    try {
        console.log("entro")
        req = matchedData(req);
        console.log(req)
        const { status } = req;
        const data = await messagesModel.findAll({ where: { status } })
        res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }
}

/**
 * Obtener un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await messagesModel.findByPk(id)
        res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_GET_ITEM')
    }
}

/**
 * registrar un item en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {

        const bodyMessage = matchedData(req);
        bodyMessage.status = 'Pending';
        bodyMessage.description_status = "first shipment";
        bodyMessage.clientIpAddress = req.ip;
        bodyMessage.attempts = 1;

        const dataMessage = await messagesModel.create(bodyMessage)

        let orderMessageBody = 1;
        const detailsToCreateBody = bodyMessage.body.map((item) => ({
            idMessage: dataMessage.id,
            body: item.text,
            createdBy: bodyMessage.createdBy,
            order: orderMessageBody++,
        }));

        await messagesDetailBodyModel.bulkCreate(detailsToCreateBody);

        let orderMessagePath = 1;
        const detailsToCreatePath = bodyMessage.file.map((item) => ({
            idMessage: dataMessage.id,
            body: item.text || "",
            file_url: item.fileUrl,
            createdBy: bodyMessage.createdBy,
            order: orderMessagePath++,
        }));

        await messagesDetailFileModel.bulkCreate(detailsToCreatePath);

        detailsToCreateBody.sort((a, b) => a.order - b.order);

        detailsToCreatePath.sort((a, b) => a.order - b.order);

        await messagesModel.updateStatusById(dataMessage.id, 'Processing', 'sorting data ')

        for (const objDetailsToCreateBody of detailsToCreateBody) {
            const { body } = objDetailsToCreateBody;
            await adapterProvider51900262844.sendText(`${bodyMessage.to}@c.us`, body);
        }

        for (const objDetailsToCreatePath of detailsToCreatePath) {
            const { body, file_url } = objDetailsToCreatePath;
            await adapterProvider51900262844.sendMedia(`${bodyMessage.to}@c.us`, file_url, body);
        }

        await messagesModel.updateStatusById(dataMessage.id, 'Sent', 'successful shipment')

        res.send({ dataMessage })

    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_CREATE_MESSAGE');
    }
}

/**
 * actualizar un item en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        // const { id, ...body } = matchedData(req);
        // const data = await messagesModel.findOneAndUpdate(
        //     { _id: id }, body
        // );
        // res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
}

/**
 * eliminar un item en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        // req = matchedData(req);
        // const { id } = req;
        // const data = await messagesModel.delete({ _id: id })
        // res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getItemsByStatus };