import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/health", (req, res) => {
  res.send("ok");
});

app.post("/api/", async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: req.body.messages,
      max_tokens: 1000,
    });
    res.send(completion.data.choices[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
