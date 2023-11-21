// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//   clientId: 'pactflow-example-consumer-js-kafka',
//   brokers: ['localhost:9092']
// })

// const consumer = kafka.consumer({ groupId: 'products-group' })

// const groupId1 = 'products-group-1';
// const groupId2 = 'products-group-2';

// const consumer1 = kafka.consumer({ groupId: groupId1 });
// const consumer2 = kafka.consumer({ groupId: groupId2 });

// const consumeProductStream = async (consumer, groupId) => {
//   try {
//     await consumer.connect();
//     await consumer.subscribe({ topic: 'products2', fromBeginning: false });
//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         console.log(`Consumer ${groupId}: Received message: ${message.value.toString()}`);
//         // Handle the message as needed
//       },
//     });
//   } catch (error) {
//     console.error('Error in consumeProductStream:', error);
//   }
// };

// const startConsumers = async () => {
//   await Promise.all([
//     consumeProductStream(consumer1, groupId1),
//     consumeProductStream(consumer2, groupId2)
//   ]);
// };


// module.exports = startConsumers
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT,
  brokers: [process.env.KAFKA_SERVER],
});

const producer = kafka.producer();

const sendMessageKafka = async (message) => {
  await producer.connect();

  producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
};
module.exports = sendMessageKafka;
