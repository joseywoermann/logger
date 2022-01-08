# Yet another logging module

## Install

```sh
npm i @josey/logger
```

## Examples

Please note: This module is **ESM-only**. If you for some reason still use CommonJS, why?

### Basic setup

```ts
import Logger from "@josey/logger";

const logger = new Logger();

logger.info("This is an example!");
```

### Configuration

It is possible to modify the loggers behaviour and appearance in the constructor. Addionally, you can set it to log to a file instead of the console.

By default, the logger will use UTC as the timezone and log to the console.

#### Logging to a text file

```ts
import Logger from "@josey/logger";

const logger = new Logger({
    output: {
        type: "file",
        file: "./logfile.txt",
    },
});

logger.info("This will be logged to 'logfile.txt'!");
```

#### Using custom colors

```ts
import Logger from "@josey/logger";

const logger = new Logger({
    colors: {
        DEBUG: "#9fa6a4",
        INFO: "#e11cff",
        WARN: "#edb611",
        ERROR: "#ff0000",
    },
});

logger.info("This will be pink! Why would you want it like that? I have no idea.");
```

#### Using local time

```ts
import Logger from "@josey/logger";

const logger = new Logger({
    timezone: "local",
});

logger.info("This will use your local timezone!");
```

### Available methods

This module provides the following methods, to all which you can pass any number of arguments of any type.

```ts
<Logger>.debug<T>(...messages: T[])
<Logger>.info<T>(...messages: T[])
<Logger>.warn<T>(...messages: T[])
<Logger>.error<T>(...messages: T[])
```
