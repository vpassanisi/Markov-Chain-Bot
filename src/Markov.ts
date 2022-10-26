import * as fs from "fs";

interface MarkovArgs {
  order: number;
  blackList: string[];
  chatData: string;
}

export class Markov {
  ngrams: Record<string, string[]>;
  starters: string[];
  order: number;
  blackList: string[];
  chatData: string;

  constructor({ order, blackList, chatData }: MarkovArgs) {
    this.order = order;
    this.blackList = blackList;
    this.chatData = chatData;
    this.ngrams = {};
    this.starters = [];
    this.buildTable();
  }

  buildTable() {
    const data = fs.readFileSync(this.chatData, "utf-8").split("\n");

    data.forEach((str) => {
      for (let j = 0; j <= str.length - this.order; j++) {
        if (!this.blackList.every((blStr) => !str.includes(blStr))) break;
        const gram = str.substring(j, j + this.order);
        if (j === 0) this.starters.push(gram);

        if (!this.ngrams[gram]) this.ngrams[gram] = [];
        this.ngrams[gram].push(str.charAt(j + this.order));
      }
    });
  }

  create() {
    let currentGram =
      this.starters[Math.floor(Math.random() * this.starters.length)];
    let result = currentGram;

    for (let i = 0; i < 100; i++) {
      const optionsArr = this.ngrams[currentGram];
      if (!optionsArr) break;
      const next = optionsArr[Math.floor(Math.random() * optionsArr.length)];
      result += next;
      currentGram = result.substring(result.length - this.order, result.length);
    }
    return result;
  }
}
