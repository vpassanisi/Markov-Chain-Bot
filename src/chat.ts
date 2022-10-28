import * as fs from "fs";
import { Markov } from "./Markov";
import { Client } from "tmi.js";
import * as notifier from "node-notifier";
import { logGreen, logMagenta, logRed, randomInRange } from "./utils";

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
  replace: string[];
}

const {
  blackList,
  botName,
  channel,
  chatData,
  logs,
  maxInterval,
  minInterval,
  order,
  auth,
  replace,
} = JSON.parse(fs.readFileSync("./config.json", "utf-8")) as Config;

const mk = new Markov({
  order,
  blackList,
  chatData,
  replaceArr: replace,
});

const client = new Client({
  channels: [channel],
  identity: {
    username: botName,
    password: auth,
  },
});

client
  .connect()
  .then((res) => logGreen(`connected to ${channel} as ${botName}`))
  .catch((err) => console.log(err));

logMagenta("started chatting");
setTimeout(function timeoutTalk() {
  const message = mk.create();
  client
    .say(channel, message)
    .then((res) => {
      fs.appendFile(
        logs,
        `${new Date().toLocaleString()}: ${message}\n`,
        (err) => {
          if (err) logRed(`error while writting to log: ${err}`);
          else {
            notifier.notify({
              title: `message sent in ${res[0]}'s chat`,
              message: message,
            });
            logMagenta(`message sent in ${res[0]}'s chat and logged`);
          }
        }
      );
    })
    .catch((err) => console.log(err));
  setTimeout(timeoutTalk, randomInRange(minInterval, maxInterval));
}, randomInRange(minInterval, maxInterval));
