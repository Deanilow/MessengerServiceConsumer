const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const axios = require('axios')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flujoClienteRegistrado = addKeyword('###_FLOW_CLIENTES_##')
    .addAnswer('Hola Danilo bienvenido te gustaria la pizza (Peperoni) de siempre? ')
    .addAnswer('Gracias por se cliente frecuente')

const flujoClienteNoRegistrados = addKeyword('###_FLOW_CLIENTES_##')
    .addAnswer('Por ser nuevo cliente tiene descuento de 10%')

const flowasdasd = addKeyword("flujo1",
    {
        caseSensitive: true,
    }).addAnswer(["bienvenido"], null,
        async (ctx, { gotoFlow }) => {
            if (ctx.from === '51917641085') {
                gotoFlow(flujoClienteRegistrado)
            }
            else {
                gotoFlow(flujoClienteNoRegistrados)
            }
        })

const guardarTikect = async (DatosEntrantes) => {

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api-ff3aj.strapidemo.com/api/tickets',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer a3cda342e89945495cfbf7d15718a3a41727666ae760089731c625c80dcd72e5740cfb009cb45b5f93151bee67c4b9b161c5fe1fd8c5e9549678a0ca51872146f87df032a88c3ebf37aafa5742a123df9f4b5176e4610f465186875c635e8ecf17d701ed4b5ebce6c7fb0f2ea0c3f74ce55d11bfa852ccb9d556fc1abd359f8d'
        },
        data: JSON.stringify({
            "data": DatosEntrantes
        })
    };

    return axios(config)
}

let GLOBAL_STATE = {}


// aqui captura lo que ecribre con capture true 
const flowDocssss = addKeyword('Restaurante1',
    {
        caseSensitive: true,
    })
    .addAnswer('📄Bienvenido')
    .addAnswer('A continuacion comenzamos')
    .addAnswer('si quieres salir del pedido escribe *salir*')
    .addAnswer('Cual es su pedido ? ', { capture: true }, async (ctx, { endFlow }) => {

        if (ctx.from == "salir") {
            return endFlow();
        }
        GLOBAL_STATE[ctx.from] = {
            nombre_cliente: ctx.body,
            descripcion: '',
            direccion: '',
            promocion: ''
        }
    })
    .addAnswer('Direccion ? ', { capture: true }, async (ctx) => {
        GLOBAL_STATE[ctx.from].direccion = ctx.body
    })
    .addAnswer('tienes codigo de promocion? ', { capture: true }, async (ctx) => {
        GLOBAL_STATE[ctx.from].promocion = ctx.body
    })
    .addAnswer('tu orden se esta procesando', null, async (ctx, { flowDynamic }) => {
        try {
            // const result = await guardarTikect(GLOBAL_STATE[ctx.from])
            // console.log(result)
            flowDynamic(`Tu orden es el 23`)

            console.log(GLOBAL_STATE)

        } catch (error) {
            console.log(error)
        }
    })

const flowDocs = addKeyword(['doc1'],
    {
        caseSensitive: true,
    }).addAnswer(
        [
            '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
            'https://bot-whatsapp.netlify.app/',
            '\n*2* Para siguiente paso.',
        ],
        null,
        null,
        [flowSecundario]
    )

const flowTuto = addKeyword(['tutorial1'],
    {
        caseSensitive: true,
    }).addAnswer(
        [
            '🙌 Aquí encontras un ejemplo rapido',
            'https://bot-whatsapp.netlify.app/docs/example/',
            '\n*2* Para siguiente paso.',
        ],
        null,
        null,
        [flowSecundario]
    )

const flowGracias = addKeyword(['gracias1', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord1'],
    {
        caseSensitive: true,
    }).addAnswer(
        ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
        null,
        null,
        [flowSecundario]
    )
const API = 'https://fakestoreapi.com/products'

const flowDocss = addKeyword('Productos1',
    {
        caseSensitive: true,
    }).addAnswer(
        [
            '📄 Lista de Productos'
        ],
        null,
        async (ctx, { flowDynamic }) => {
            try {
                const respuesta = await axios(API)

                let contador = 1

                for (const item of respuesta.data) {
                    if (contador > 4) break;
                    contador++;
                    flowDynamic({ body: item.title, media: item.image })
                }

            } catch (error) {
                console.log(error)
            }
        }
    )

const flowPrincipal = addKeyword(['hola1'],
    {
        caseSensitive: true,
    })
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc1* para ver la documentación',
            '👉 *gracias1*  para ver la lista de videos',
            '👉 *discord1* unirte al discord',
            '👉 *Productos1* unirte al discord',
            '👉 *Restaurante1* unirte al discord',
            '👉 *flujo1* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord, flowDocss, flowDocssss, flowasdasd]
    )


const bot_name = "51917641085"

const adapterProvider51917641085 = createProvider(BaileysProvider, {
    name: bot_name
})

// const adapterProvider = createProvider(BaileysProvider)

const main51917641085 = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])

    createBot({
        flow: adapterFlow,
        provider: adapterProvider51917641085,
        database: adapterDB,
    })

    // QRPortalWeb()
    QRPortalWeb({ name: bot_name, port: process.env.PORT_BOT2 })
}

module.exports = {
    main51917641085,
    adapterProvider51917641085  // Exporta adapterProvider
};

