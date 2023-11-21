const express = require("express");
const router = express.Router();
const {
    getItems,
    getItem,
    getItemsByStatus,
    createItem,
    updateItem,
    deleteItem,
} = require("../controllers/message");
const {
    validatorCreateMessage,
    validatorGetMessage,
    validatorGetAllByStatus
} = require("../validators/message");


/**
 * Register a new message
 * @openapi
 * /message:
 *    post:
 *      tags:
 *        - messages
 *      summary: "Register a message"
 *      description: Register a message and return details about it
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description:  return details about it.
 *        '422':
 *          description: error in validations.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/message"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post(
    "/",
    validatorCreateMessage,
    createItem
);


/**
 * GetAll messages
 * @openapi
 * /message:
 *    get:
 *      tags:
 *        - messages
 *      summary: "GetAll message"
 *      description: GetAll messages 
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description:  return details about it.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/message'
 *        '422':
 *          description: error in validations.
 */
router.get(
    "/",
    getItems
);


/**
 * Get track
 * @openapi
 * /message/{id}:
 *    get:
 *      tags:
 *        - messages
 *      summary: "Detalle cancion"
 *      description: Obten el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/message'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", validatorGetMessage, getItem);
/**
 * Get track
 * @openapi
 * /message/status/{status}:
 *    get:
 *      tags:
 *        - messages
 *      summary: "Detalle cancion"
 *      description: Obten el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: status
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/message'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/status/:status", validatorGetAllByStatus, getItemsByStatus);
module.exports = router;
