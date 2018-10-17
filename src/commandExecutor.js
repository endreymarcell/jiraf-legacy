const commandLineArgs = require("command-line-args");

const defs = require("./utils/argDefinitions");
const {listCardsCommand, currentCardCommand} = require("./commands/listCommands");
const {setProjectCommand, unsetProjectCommand, setCardCommand, unsetCardCommand} = require("./commands/sessionCommands");
const {assignCardCommand, unassignCardCommand}= require("./commands/cardCommands");
const {moveCommand} = require("./commands/moveCommand");
const {branchCommand} = require("./commands/branchCommand");
const {webCommand} = require("./commands/webCommand");
const {getFromConfig} = require("./utils/storageHandler");

const commandMap = {
    ls: {
        argDefinitions: defs.listCardsDefinitions,
        commandFunction: listCardsCommand,
    },
    setproject: {
        argDefinitions: defs.setProjectDefinitions,
        commandFunction: setProjectCommand,
    },
    unsetproject: {
        argDefinitions: null,
        commandFunction: unsetProjectCommand,
    },
    set: {
        argDefinitions: defs.setDefinitions,
        commandFunction: setCardCommand,
    },
    unset: {
        argDefinitions: null,
        commandFunction: unsetCardCommand,
    },
    current: {
        argDefinitions: null,
        commandFunction: currentCardCommand,
    },
    assign: {
        argDefinitions: defs.assignDefinitions,
        commandFunction: assignCardCommand,
    },
    unassign: {
        argDefinitions: null,
        commandFunction: unassignCardCommand,
    },
    move: {
        argDefinitions: defs.moveDefinitions,
        commandFunction: moveCommand,
    },
    branch: {
        argDefinitions: defs.branchDefinitions,
        commandFunction: branchCommand,
    },
    web: {
        argDefinitions: defs.webDefinitions,
        commandFunction: webCommand,
    },
}

const isKnownCommand = commandName => Object.keys(commandMap).indexOf(commandName) !== -1;

const executeKnownCommand = (commandName, args) => {
    const commandFunction = commandMap[commandName].commandFunction;
    const options = commandMap[commandName].argDefinitions
        ? commandLineArgs(commandMap[commandName].argDefinitions, {argv: args})
        : null;
    commandFunction(options);
}

const isShortcut = commandName => {
    const shortcuts = getFromConfig("shortcuts");
    return Object.keys(shortcuts).indexOf(commandName) !== -1;
}

const executeShortcut = (shortcut, args) => {
    const shortcuts = getFromConfig("shortcuts");
    const shortcutCommandsAndArgs = shortcuts[shortcut];
    shortcutCommandsAndArgs.forEach(commandAndArgs => {
        const [command, ...shortcutArgs] = commandAndArgs.split(" ");
        const shortcutArgsSubstituted = getSubstitutedShortcutArgs(shortcutArgs, args);
        executeKnownCommand(command, shortcutArgsSubstituted || []);
    });
}

const getSubstitutedShortcutArgs = (shortcutArgs, args) => {
    let substitutedArgs;
    const placeholderPosition = shortcutArgs.indexOf("{}");
    if (placeholderPosition !== -1) {
        substitutedArgs = [
            ...shortcutArgs.slice(0, placeholderPosition),
            ...args,
            ...shortcutArgs.slice(placeholderPosition + 1)
        ];
    } else {
        substitutedArgs = shortcutArgs;
    }
    return substitutedArgs;
}

module.exports = {
    commandMap,
    isKnownCommand,
    executeKnownCommand,
    isShortcut,
    executeShortcut,
}
