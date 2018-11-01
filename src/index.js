const commandLineArgs = require("command-line-args");

const {die} = require("./utils/utils");
const {isKnownCommand, executeKnownCommand, isShortcut, executeShortcut} = require("./commandExecutor");
const defs = require("./utils/argDefinitions");

const mainOptions = commandLineArgs(defs.mainDefinitions, {stopAtFirstUnknown: true});
const command = mainOptions.command || "web";
const args = mainOptions._unknown || [];

try {
    if (isShortcut(command)) {
        executeShortcut(command, args);
    } else if (isKnownCommand(command)) {
        executeKnownCommand(command, args);
    } else {
        die(`unkonwn command '${command}'`);
    }
} catch (error) {
    die(error.message);
}
