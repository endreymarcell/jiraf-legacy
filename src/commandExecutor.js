const commandLineArgs = require("command-line-args");

const defs = require("./utils/argDefinitions");
const {branchCommand, checkCommand, prCommand} = require("./commands/gitCommands");
const {listCardsCommand} = require("./commands/listCommand");
const {
    setProjectCommand,
    refreshProjectCommand,
    unsetProjectCommand,
    setCardCommand,
    refreshCardCommand,
    unsetCardCommand,
} = require("./commands/sessionCommands");
const {statusCommand, assignCardCommand, unassignCardCommand, moveCommand} = require("./commands/cardCommands");
const {webCommand} = require("./commands/webCommand");
const {readFromConfig} = require("./utils/storageHandler");

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
    status: {
        argDefinitions: defs.statusDefinitions,
        commandFunction: statusCommand,
    },
    refresh: {
        argDefinitions: null,
        commandFunction: refreshCardCommand,
    },
    refreshproject: {
        argDefinitions: null,
        commandFunction: refreshProjectCommand,
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
    pr: {
        argDefinitions: null,
        commandFunction: prCommand,
    },
    check: {
        argDefinitions: null,
        commandFunction: checkCommand,
    },
    web: {
        argDefinitions: defs.webDefinitions,
        commandFunction: webCommand,
    },
};

const isKnownCommand = commandName => Object.keys(commandMap).indexOf(commandName) !== -1;

const executeKnownCommand = (commandName, args) => {
    const commandFunction = commandMap[commandName].commandFunction;
    const options = commandMap[commandName].argDefinitions
        ? commandLineArgs(commandMap[commandName].argDefinitions, {argv: args})
        : null;
    commandFunction(options);
};

const isShortcut = commandName => {
    const shortcuts = readFromConfig("shortcuts");
    return Object.keys(shortcuts).indexOf(commandName) !== -1;
};

const executeShortcut = (shortcut, args) => {
    const shortcuts = readFromConfig("shortcuts");
    const shortcutCommandsAndArgs = shortcuts[shortcut];
    shortcutCommandsAndArgs.forEach(commandAndArgs => {
        const [command, ...shortcutArgs] = commandAndArgs.split(" ");
        const shortcutArgsSubstituted = getSubstitutedShortcutArgs(shortcutArgs, args);
        executeKnownCommand(command, shortcutArgsSubstituted || []);
    });
};

const getSubstitutedShortcutArgs = (shortcutArgs, args) => {
    let substitutedArgs;
    const placeholderPosition = shortcutArgs.indexOf("{}");
    if (placeholderPosition !== -1) {
        substitutedArgs = [
            ...shortcutArgs.slice(0, placeholderPosition),
            ...args,
            ...shortcutArgs.slice(placeholderPosition + 1),
        ];
    } else {
        substitutedArgs = shortcutArgs;
    }
    return substitutedArgs;
};

module.exports = {
    commandMap,
    isKnownCommand,
    executeKnownCommand,
    isShortcut,
    executeShortcut,
};
