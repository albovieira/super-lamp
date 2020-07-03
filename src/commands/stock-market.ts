import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import * as chalk from "chalk";
import { storage } from "../services/storage";
import { Alpha } from "../services/clients/alpha";

export default class StockMarket extends Command {
  static description = "stock market list";

  static examples = [
    `
  $ stock-market -s STOCK1,STOCK2 mystocks
  $ stock-market -c mystocks --sort=-change
  `,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    set: flags.string({ char: "s", description: "set stocks to check" }),
    check: flags.boolean({ char: "c", description: "check status quotes" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),

    ...cli.table.flags(),
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
    if (flags.set) {
      this.log(`Saving stocks with alias ${args.alias}`)
      this.set(args.alias, flags.set)
      this.log('Done')
    } else if (flags.check) {
      this.log(`Getting stocks for alias ${args.alias}`)
      await this.check(args.alias, flags.sort, flags.filter)
      this.log('Done!')
    }
  }

  private set(alias: string, quotes: string) {
    const quoteAsArray = (quotes || "").split(",")
    if(quoteAsArray.length === 0) {
      throw new Error('invalid quotes')
    }
    storage.set(alias, quoteAsArray);
  }

  private async check(alias: string, sort:any, filter: any) {
    const quotes = storage.get(alias);
      cli.action.start('')
      const raw = (await Promise.all(quotes.map(Alpha.summary)))
      .filter(
        (r) => !!r
      ) as any;
      if(raw.length === 0) {
        cli.action.stop()
        throw new Error('quotes not found')
      }

      cli.table(
        raw,
        {
          symbol: {},
          open: {
            get: (row:any) => chalk.bgWhite(chalk.black(row.open))
          },
          high: {
            get: (row:any) => chalk.bgBlack(chalk.green(row.high))
          },
          low: {
            get: (row:any) => chalk.bgBlack(chalk.red(row.low))
          },
          price: {
            get: (row:any) => chalk.bgBlack(chalk.blue(row.price))
          },
          volume: {},
          latest: {},
          previous: {},
          change: {
            get: (row:any) => {
              const n = row.change.split("%")[0];
              return this.applyColor(n);
            },
          },
        },
        {
          sort: sort,
          filter: filter,
        }
      );
      cli.action.stop()
  }

  private applyColor(value: string) {
    return Number(value) > 0
      ? chalk.green(value)
      : Number(value) < 0
      ? chalk.red(value)
      : value;
  }
}
