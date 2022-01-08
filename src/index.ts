// @ts-expect-error
import chalk from "chalk";
import { Console } from "console";
import * as fs from "fs";

type Timezone = "UTC" | "local";

interface Config {
    timezone?: Timezone;
    colors?: Colors;
    output?: ConsoleOutputOptions | FileOutputOptions;
}

interface ConsoleOutputOptions {
    type: "console";
}

interface FileOutputOptions {
    type: "file";
    file: string;
}

interface Colors {
    DEBUG: string;
    INFO: string;
    WARN: string;
    ERROR: string;
}

const defaultConfig: Config = {
    timezone: "UTC",
    colors: {
        DEBUG: "#9DD1BA",
        INFO: "#BAD755",
        WARN: "#FDD662",
        ERROR: "#FD647A",
    },
    output: {
        type: "console",
    },
};

/**
 * Yet another logging module
 * @author Josey Wörmann <jcw05@gmx.de>
 * @see https://github.com/joseywoermann/logger
 */
export default class Logger {
    private readonly _config: Config = defaultConfig;
    private readonly _console: Console = console;

    /**
     * Creates a new Logger instance with a given time zone setting.
     * @param timezone Either `"UTC"` or `"local"`. This decides whether to use the local timezone or UTC as the time.
     * @param config Additional settings like custom colors.
     */
    constructor(config?: Config) {
        this._config.timezone = config?.timezone ?? defaultConfig.timezone;
        this._config.colors = config?.colors ?? defaultConfig.colors;
        this._config.output = config?.output ?? defaultConfig.output;

        // If a log file has been specified, set up a custom Console object with the target
        if (this._config.output.type === "file") {
            this._console = new Console({ stdout: fs.createWriteStream(config?.output["file"]) });
        }
    }

    /**
     * Logs a debug message to the console.
     * @param messages
     */
    public debug = <T>(...messages: T[]): void => {
        this._console.debug(
            `${this.time()} ${
                this._config.output?.type === "console"
                    ? chalk.hex(this._config.colors.DEBUG)("[DEBUG]")
                    : "[DEBUG]"
            }`,
            ...messages
        );
    };

    /**
     * Logs an info message to the console.
     * @param messages
     */
    public info = <T>(...messages: T[]): void => {
        this._console.info(
            `${this.time()} ${
                this._config.output?.type === "console"
                    ? chalk.hex(this._config.colors.INFO)("[INFO] ")
                    : "[INFO] "
            }`,
            ...messages
        );
    };

    /**
     * Logs a warning to the console.
     * @param messages
     */
    public warn = <T>(...messages: T[]): void => {
        this._console.warn(
            `${this.time()} ${
                this._config.output?.type === "console"
                    ? chalk.hex(this._config.colors.WARN)("[WARN] ")
                    : "[WARN] "
            }`,
            ...messages
        );
    };

    /**
     * Logs an error to the console.
     * @param messages
     */
    public error = <T>(...messages: T[]): void => {
        this._console.error(
            `${this.time()} ${
                this._config.output?.type === "console"
                    ? chalk.hex(this._config.colors.ERROR)("[ERROR]")
                    : "[ERROR]"
            }`,
            ...messages
        );
    };

    /**
     * An internal helper method that returns a formatted string with time and date according to the user's time zone preference.
     * @returns
     */
    private time = (): string => {
        const now = new Date();

        if (this._config.timezone === "UTC") {
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
