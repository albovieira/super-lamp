import * as superagent from "superagent";

const URL = "https://www.alphavantage.co/query?";
const OUTPUTSIZE = "compact";
const DATATYPE = "json";
const APIKEY = "YQFH2P7AQ6SWVGMG";

export class Alpha {
  static async summary(quote: string) {
    const fn = "GLOBAL_QUOTE";
    const { body } = await superagent.get(URL).query({
      outputsize: OUTPUTSIZE,
      datatype: DATATYPE,
      apikey: APIKEY,
      function: fn,
      symbol: `${quote}.SA`,
    });

    const result = body["Global Quote"];
    const parsed = Object.keys(result).reduce((acc: any, key) => {
      const original = key;
      let parsedKey = key.substring(key.indexOf(" ")).trimLeft();
      if (parsedKey.split(" ").length > 0) {
        parsedKey = parsedKey.split(" ")[0];
      }
      acc[parsedKey] = result[original];
      return acc;
    }, {});

    return parsed;
  }
}
