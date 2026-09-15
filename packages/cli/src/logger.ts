const useColor = process.stdout.isTTY && !process.env.NO_COLOR;

const paint = (code: number) => (text: string) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text);

export const color = {
  bold: paint(1),
  dim: paint(2),
  red: paint(31),
  green: paint(32),
  yellow: paint(33),
  cyan: paint(36),
};

export const log = {
  info: (message: string) => console.log(message),
  step: (message: string) => console.log(`${color.cyan("▪")} ${message}`),
  success: (message: string) => console.log(`${color.green("✔")} ${message}`),
  warn: (message: string) => console.warn(`${color.yellow("!")} ${message}`),
  error: (message: string) => console.error(`${color.red("✖")} ${message}`),
  blank: () => console.log(""),
};

export class CliError extends Error {
  constructor(
    message: string,
    readonly hint?: string,
  ) {
    super(message);
  }
}
