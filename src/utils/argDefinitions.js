const mainDefinitions = [{name: "command", defaultOption: true}];

const setProjectDefinitions = [{name: "projectKey", defaultOption: true, type: String}];

const setDefinitions = [{name: "cardKey", defaultOption: true, type: String}];

const detailsDefinitions = [{name: "template", defaultOption: true, type: String}];

const listCardsDefinitions = [
    {name: "statusSlug", alias: "s", type: String},
    {name: "assignee", alias: "a", type: String},
];

const assignDefinitions = [{name: "assignee", defaultOption: true, type: String}];

const branchDefinitions = [{name: "branchName", defaultOption: true, type: String}];

const moveDefinitions = [{name: "status", defaultOption: true, type: String}];

const webDefinitions = [{name: "target", defaultOption: true, type: String}];

module.exports = {
    mainDefinitions,
    setProjectDefinitions,
    setDefinitions,
    detailsDefinitions,
    listCardsDefinitions,
    assignDefinitions,
    branchDefinitions,
    moveDefinitions,
    webDefinitions,
};
