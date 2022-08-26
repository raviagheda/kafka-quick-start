import { ITopicConfig, Kafka, Message } from "kafkajs";

const kafka = new Kafka({
    clientId: 'kafka-app-poc',
    brokers: ['localhost:9092']
})

export const consumeMessages = async (topicName: string) => {
    const consumer = kafka.consumer({ groupId: 'group-a' });
    await consumer.connect()
    await consumer.subscribe({ topic: 'topic-a' })

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat }) => {
            console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            })
        },
    });
}