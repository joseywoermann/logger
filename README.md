# Yet another logging module

## Install

```sh
npm i @josey/logger
```

## Examples

### Basic setup

```ts
import Logger from "@josey/logger";

const logger = new Logger("UTC");

logger.info("This is an example!");
```

### Advanced setup with custom colors & explicit types

```ts
import Logger from "@josey/logger";

const logger = new Logger("local", {
    colors: {
        DEBUG: "#9fa6a4",
        INFO: "#32a852",
        WARN: "#edb611",
        ERROR: "#ff0000",
    },
});

logger.debug<string>("Hello", "there!");
logger.info<number>(1, 2, 3, 4, 5, 6, 7, 8, 9);
logger.warn<boolean>(false, true);
logger.error<string[]>(["a", "b", "c"]);
```

### Available methods

This module provides the following methods, to all which you can pass any number of arguments of any type.

```ts
Logger.debug<T>(...messages: T[])
Logger.info<T>(...messages: T[])
Logger.warn<T>(...messages: T[])
Logger.error<T>(...messages: T[])
```

### Configuration

it is possible to modify the loggers behaviour and appereance in the constructor.

The fist argument determines whether to use UTC or local time.
The second argument can be used to change the colors used to highlight the log level.

```ts
import Logger from "@josey/logger";

// Either "UTC" or "local"
const logger = new Logger("local", {
    // Pass 4 hex-color string to change the color palette
    colors: {
        DEBUG: "#9fa6a4",
        INFO: "#32a852",
        WARN: "#edb611",
        ERROR: "#ff0000",
    },
});
```
