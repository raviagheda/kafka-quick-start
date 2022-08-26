import express from 'express';
import { createTopic, listTopics, produceMessage } from './kafka';
const app = express();
app.use(express.json());
const port = 3000;

app.post('/produce', async (req, res) => {
  const { topicName = 'topic-a', messages = [] } = req.body;
  try {
    const produced_messsage = await produceMessage(topicName, messages.map((item: string) => ({
      key: `${Date.now()}`,
      value: item
    })));

    console.log(produced_messsage);

    res.send({ status: true, error: false, data: produced_messsage })
  } catch (error) {
    console.log(error);
    res.send({ status: false, error: error?.message, data: error })
  }
});

app.get('/createTopic', async (req, res) => {
  
  try {
    const topic = await createTopic([{ topic: 'topic-a'}]);
    res.send({ status: true, error: false, data: topic })
  } catch (error) {
    console.log(error);
    res.send({ status: false, error: error?.message, data: error });
  }
})

app.get('/listTopics', async (req, res) => {
  try {
    const topic = await listTopics();
    res.send({ status: true, error: false, data: topic })
  } catch (error) {
    console.log(error);
    res.send({ status: false, error: error?.message, data: error });
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});