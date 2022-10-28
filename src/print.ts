import * as fs from "fs";
import { Markov } from "./Markov";

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

console.log(mk.create());
