import OpenAI from "openai";
import express, { request, response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: "Y24wZXA1ZWNwN2ZjbG5wOWdjbjA6bXNrLUZuSkRNVWhCWFNDdFV4NEpJYjc4Q0gyT1ZlOTk=", // This is also the default, can be omitted
    baseURL: "https://api.moonshot.cn/v1"
});

app.post("/", async (request, response) => {
    const { chats } = request.body;

    const result = await openai.chat.completions.create({
        model: "moonshot-v1-8k",
        messages: [{ role: "system", content: "你是 Kimi, 由 Moonshot AI 提供的人工智能助手, 你更擅长中文和英文的对话。你会为用户提供安全, 有帮助, 准确的回答。同时, 你会拒绝一些涉及恐怖主义, 种族歧视, 黄色暴力等问题的回答。Moonshot AI 为专有名词, 不可翻译成其他语言。", }, ...chats,],
    });

    response.json({
        output: result.choices[0].message,
    });

});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
