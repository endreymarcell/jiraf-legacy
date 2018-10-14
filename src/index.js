const commandLineArgs = require("command-line-args");
const {branchCommand} = require("./commands/branchCommand");
const {assignCardCommand, unassignCardCommand}= require("./commands/cardCommands");

const {mainDefinitions, setProjectDefinitions, setDefinitions, webDefinitions, listCardsDefinitions, assignDefinitions, branchDefinitions} = require("./utils/argDefinitions");
const {listCardsCommand, currentCardCommand} = require("./commands/listCommands");
const {setProjectCommand, unsetProjectCommand, setCardCommand, unsetCardCommand} = require("./commands/sessionCommands");
const {webCommand} = require("./commands/webCommand");

const mainOptions = commandLineArgs(mainDefinitions, {stopAtFirstUnknown: true});
const argv = mainOptions._unknown || [];

try {
    switch (mainOptions.command) {
        case "ls":
            const listCardsOptions = commandLineArgs(listCardsDefinitions, {argv});
            listCardsCommand(listCardsOptions);
            break;
        case "setproject":
            const setProjectOptions = commandLineArgs(setProjectDefinitions, {argv});
            if (setProjectOptions.project) {
                setProjectCommand(setProjectOptions.project);
            } else {
                throw "setproject requires a project key";
            }
            break;
        case "unsetproject":
            unsetProjectCommand();
            break;
        case "set":
            const setOptions = commandLineArgs(setDefinitions, {argv});
            if (setOptions.card) {
                setCardCommand(setOptions.card);
            } else {
                throw "set required a card key";
            }
            break;
        case "unset":
            unsetCardCommand();
            break;
        case "current":
            currentCardCommand();
            break;
        case "assign":
            const assignOptions = commandLineArgs(assignDefinitions, {argv});
            assignCardCommand(assignOptions.assignee);
            break;
        case "unassign":
            unassignCardCommand();
            break;
        case "branch":
            const branchOptions = commandLineArgs(branchDefinitions, {argv});
            branchCommand(branchOptions);
            break;
        case "web":
            const webOptions = commandLineArgs(webDefinitions, {argv});
            webCommand(webOptions.target);
            break;
        default:
            console.error("jiraf went tits up: unknown command " + mainOptions.command);
    }
} catch (e) {
    console.error("jiraf went tits up: " + e);
}
