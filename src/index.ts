// @ts-expect-error
import chalk from "chalk";

type Timezone = "UTC" | "local";

interface Config {
    colors: Colors;
}

interface Colors {
    DEBUG: string;
    INFO: string;
    WARN: string;
    ERROR: string;
}

enum DefaultColors {
    DEBUG = "#9DD1BA",
    INFO = "#BAD755",
    WARN = "#FDD662",
    ERROR = "#FD647A",
}

/**
 * Yet another logging module
 * @author Josey Wörmann <jcw05@gmx.de>
 * @see https://github.com/joseywoermann/logger
 */
export default class Logger {
    readonly #timezone: Timezone;
    readonly #config: Config = {
        colors: DefaultColors,
    };

    /**
     * Create a new Logger instance with a given time zone setting.
     * @param timezone Either `"UTC"` or `"local"`. This decides whether to use the local timezone or UTC as the time.
     * @param config Additional settings like custom colors.
     */
    constructor(timezone: Timezone, config?: Config) {
        this.#timezone = timezone;
        this.#config = config ?? this.#config;
    }

    /**
     * Logs a debug message to the console.
     * @param messages
     */
    public debug = <T>(...messages: T[]): void => {
        console.debug(`${this.time()} ${chalk.hex(this.#config.colors.DEBUG)("[DEBUG]")}`, ...messages);
    };

    /**
     * Logs an info message to the console.
     * @param messages
     */
    public info = <T>(...messages: T[]): void => {
        console.info(`${this.time()} ${chalk.hex(this.#config.colors.INFO)("[INFO] ")}`, ...messages);
    };

    /**
     * Logs a warning to the console.
     * @param messages
     */
    public warn = <T>(...messages: T[]): void => {
        console.warn(`${this.time()} ${chalk.hex(this.#config.colors.WARN)("[WARN] ")}`, ...messages);
    };

    /**
     * Logs an error to the console.
     * @param messages
     */
    public error = <T>(...messages: T[]): void => {
        console.error(`${this.time()} ${chalk.hex(this.#config.colors.ERROR)("[ERROR]")}`, ...messages);
    };

    /**
     * An internal helper method that returns a formatted string with time and date according to the user's time zone preference.
     * @returns
     */
    private time = (): string => {
        const now = new Date();

        if (this.#timezone === "UTC") {
            return `[${now.getUTCFullYear()}-${this.format(now.getUTCMonth() + 1)}-${this.format(
                now.getUTCDate()
            )}] [${this.format(now.getUTCHours())}:${this.format(now.getUTCMinutes())}:${this.format(
                now.getUTCSeconds()
            )}]`;
        } else {
            return `[${now.getFullYear()}-${this.format(now.getMonth() + 1)}-${this.format(
                now.getDate()
            )}] [${this.format(now.getHours())}:${this.format(now.getMinutes())}:${this.format(
                now.getSeconds()
            )}]`;
        }
    };

    /**
     * We want our values to always be double-digit (except for year), this internal helper function guarantees that.
     * @param date
     * @returns
     */
    private format = (date: string | number): string => {
        if (typeof date === "number") {
            date = date.toString();
        }
        return date.length === 1 ? `0${date}` : date;
    };
}
