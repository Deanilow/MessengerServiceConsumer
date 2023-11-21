require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const app = express();
const openApiConfigurations = require("./docs/swagger");
const db = require("./config/sql");
const { main51900262844 } = require("./bot-whatsapp/bot.51900262844");
const { main51917641085 } = require("./bot-whatsapp/bot.51917641085");
const startConsumers = require("../src/config/kafka");

app.use(cors());
app.use(express.json());

const port = process.env.PORT_API || 3000

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConfigurations))

app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log('tu app esta lista http://localhost:' + port)
})

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        db.sequelize.sync();
        // db.sequelize.sync({ force: true }).then(() => {
        //     console.log("Drop and re-sync db.");
        // });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

main51900262844();
main51917641085();
startConsumers().catch(e => console.error('Error al ejecutar el consumidor:', e));
