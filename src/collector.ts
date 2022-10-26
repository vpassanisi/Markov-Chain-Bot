import { Client } from "tmi.js";
import * as fs from "fs";
import { logMagenta } from "./utils";

interface Config {
  botName: string;
  channel: string;
  minInterval: number;
  maxInterval: number;
  order: number;
  blackList: string[];
  logs: string;
  chatData: string;
  auth: string;
}

const { auth, channel, botName, chatData } = JSON.parse(
  fs.readFileSync("./config.json", "utf-8")
) as Config;

const client = new Client({
  channels: [channel],
  identity: {
    username: botName,
    password: auth,
  },
});

client
  .connect()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

client.on("message", (channel, tags, message, self) => {
  fs.appendFileSync(chatData, message + "\n");
  logMagenta(message);
});

process.on("SIGINT", () => {
  process.exit();
});
