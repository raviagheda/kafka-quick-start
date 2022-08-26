# kafka-with-ts
A Kafka get started typescript app with producer ( as server ) and consumer

## Get started

1. Clone a repo
2. Start kafka from dockcer image by `docker compose up`
3. Create a Topic by making a GET Request `createTopic`, it'll create a topic with name `topic-a` 
4. Verify topic creation by making a GET request `listTopics`.
5. Produce message by making POST request to `/produce`, 
  params:
  ```json
    {
    "topicName": "topic-a",
    "messages": ["Hello World"]
}
  ```
  
  6. Run Consumer app and you can find logs of producers once consumer connected successfully

