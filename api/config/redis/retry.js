
let defaults = {
    "NUMBER_OF_RETRY_ATTEMPTS" : 5,
    "DELAY_OF_RETRY_ATTEMPTS" : 700,
    // 5 min
    "WAIT_TIME" : 5000,
    "ALLOW_TO_START_WITHOUT_CONNECTION": true
  };


export default function init (moduleOptions) {

    var redisExists = false;

    if (moduleOptions) {
        if (moduleOptions.hasOwnProperty("number_of_retry_attempts") && !isNaN(moduleOptions.number_of_retry_attempts)) {
            defaults.NUMBER_OF_RETRY_ATTEMPTS = moduleOptions.number_of_retry_attempts;
        }
        if (moduleOptions.hasOwnProperty("delay_of_retry_attempts") && !isNaN(moduleOptions.delay_of_retry_attempts)) {
            defaults.DELAY_OF_RETRY_ATTEMPTS = moduleOptions.delay_of_retry_attempts;
        }
        if (moduleOptions.hasOwnProperty("wait_time") && !isNaN(moduleOptions.wait_time)) {
            defaults.WAIT_TIME = moduleOptions.wait_time;
        }
        if (moduleOptions.hasOwnProperty("allow_to_start_without_connection") && typeof moduleOptions.allow_to_start_without_connection === "boolean") {
            defaults.ALLOW_TO_START_WITHOUT_CONNECTION = moduleOptions.allow_to_start_without_connection;
        }
    }


    return function retryStrategy (options) {

        if (!redisExists 
            && !defaults.ALLOW_TO_START_WITHOUT_CONNECTION 
            && options.error 
            && options.error.code === "ECONNREFUSED") {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error("The server refused the connection");
        }

        redisExists = true;

        if (!defaults.NUMBER_OF_RETRY_ATTEMPTS) {
            // End reconnecting with built in error
            return undefined;
        }

        if (!options.attempt) {
            // if there is no attempt, try again
            return defaults.DELAY_OF_RETRY_ATTEMPTS;
        }

        if ((options.attempt % (defaults.NUMBER_OF_RETRY_ATTEMPTS + 1)) === 0) {
            return defaults.WAIT_TIME;
        } else {
            return defaults.DELAY_OF_RETRY_ATTEMPTS;
        }
    };

};