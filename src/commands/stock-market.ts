import { Command, flags } from "@oclif/command";
import { storage } from "../services/storage";

export default class StockMarket extends Command {
  static description = "market stock options";

  static examples = [`$ cmd-a stock-market quotes STOCK1,STOCK2`];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    quote: flags.string({ char: "q", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  };

  static args = [
    {
      name: "alias",
      required: true,
      description: "alias to persist quotes",
    },
  ];

  async run() {
    const { args, flags } = this.parse(StockMarket);
    if (
      (!args.alias && !flags.quote) ||
      (flags.quote || "").split(",").length === 0
    ) {
      throw new Error("Any quote given");
    }
    if (!args.alias) {
      throw new Error("You must give a alias");
    }

    const fromDB = storage.get(args.alias);
    console.log("fromDB", fromDB);
    if (!fromDB) {
      const quotes = (flags.quote || "").split(",");
      storage.set(args.alias, quotes);
    }
    console.log(args, flags);
  }
}
