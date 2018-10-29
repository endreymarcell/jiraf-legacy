const mainDefinitions = [{name: "command", defaultOption: true}];

const setProjectDefinitions = [{name: "project", defaultOption: true, type: String}];

const setDefinitions = [{name: "card", defaultOption: true, type: String}];

const statusDefinitions = [{name: "pattern", defaultOption: true, type: String}];

const listCardsDefinitions = [
    {name: "statusSlug", alias: "s", type: String},
    {name: "assignee", alias: "a", type: String},
];

const assignDefinitions = [{name: "assignee", defaultOption: true, type: String}];

const branchDefinitions = [
    {name: "prefix-with-card-key", alias: "p", type: Boolean, defaultValue: false},
    {name: "branchName", defaultOption: true, type: String},
];

const moveDefinitions = [{name: "status", defaultOption: true, type: String}];

const webDefinitions = [{name: "target", defaultOption: true, type: String}];

module.exports = {
    mainDefinitions,
    setProjectDefinitions,
    setDefinitions,
    statusDefinitions,
    listCardsDefinitions,
    assignDefinitions,
    branchDefinitions,
    moveDefinitions,
    webDefinitions,
};
