const commandLineArgs = require("command-line-args");

const {commandMap, isKnownCommand, executeKnownCommand, isShortcut, executeShortcut} = require("./commandExecutor");
const defs = require("./utils/argDefinitions");


const mainOptions = commandLineArgs(defs.mainDefinitions, {stopAtFirstUnknown: true});
const command = mainOptions.command;
const args = mainOptions._unknown || [];

if (isKnownCommand(command)) {
    executeKnownCommand(command, args);
} else if (isShortcut(command)) {
    executeShortcut(command, args);
} else {
    console.error(`jiraf went tits up: unkonwn command '${command}'`);
}
