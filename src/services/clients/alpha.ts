import * as superagent from "superagent";

const URL = "https://www.alphavantage.co/query?";
const OUTPUTSIZE = "compact";
const DATATYPE = "json";
const APIKEY = "YQFH2P7AQ6SWVGMG";

export class Alpha {
  static async summary(quote: string) {
    try {
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
        if(!parsedKey) return acc

        let value = result[original];
        if (parsedKey !== "volume" && Number(value)) {
          value = Number(value).toFixed(2);
        }
        acc[parsedKey] = value;
        return acc;
      }, {});

      return parsed;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
