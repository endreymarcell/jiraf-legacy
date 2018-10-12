const mainDefinitions = [{name: "command", defaultOption: true}];
const setProjectDefinitions = [{name: "project", defaultOption: true, type: String}];
const setDefinitions = [{name: "card", defaultOption: true, type: String}];
const listCardsDefinitions = [
    {name: "long", alias: "l", type: Boolean, defaultValue: false},
    {name: "statusSlug", alias: "s", type: String},
    {name: "assignee", alias: "a", type: String},
];
const assignDefinitions = [{name: "assignee", type: String}];
const webDefinitions = [{name: "target", defaultOption: true, type: String}];

module.exports = {
    mainDefinitions,
    setProjectDefinitions,
    setDefinitions,
    listCardsDefinitions,
    assignDefinitions,
    webDefinitions,
};
