const commandLineArgs = require("command-line-args");

const {isKnownCommand, executeKnownCommand, isShortcut, executeShortcut} = require("./commandExecutor");
const defs = require("./utils/argDefinitions");


const mainOptions = commandLineArgs(defs.mainDefinitions, {stopAtFirstUnknown: true});
const command = mainOptions.command;
const args = mainOptions._unknown || [];

if (isShortcut(command)) {
    executeShortcut(command, args);
} else if (isKnownCommand(command)) {
    executeKnownCommand(command, args);
} else {
    console.error(`jiraf went tits up: unkonwn command '${command}'`);
}
