import { ITopicConfig, Kafka, Message } from "kafkajs";

// DEV_KAFKA_CLIENTID='keenver-csv-processing'
// DEV_KAFKA_BROKERS=localhost:9092

const kafka = new Kafka({
    clientId: 'kafka-app-poc',
    brokers: ['localhost:9092']
})

export const createTopic = async (topics: ITopicConfig[]) => {
    const admin = kafka.admin();
    await admin.connect();

    await admin.createTopics({ topics });
    const listTopics = await admin.listTopics();

    await admin.disconnect();
    return listTopics;
}

export const listTopics = async () => {
    const admin = kafka.admin();
    await admin.connect();

    const listTopics = await admin.listTopics();

    await admin.disconnect();
    return listTopics;
}


// [
//     { key: 'key1', value: 'hello world', partition: 0 },
//     { key: 'key2', value: 'hey hey!', partition: 1 }
// ],
export const produceMessage = async (topicName: string, messages: Message[] ) => {
    const producer = kafka.producer();
    await producer.connect();
    const producer_log = await producer.send({
        topic: topicName,
        messages: messages
    });
    
    return producer_log;

}