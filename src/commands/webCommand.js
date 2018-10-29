const opn = require("opn");
const {readActiveCardKey, readFromConfig} = require("../utils/storageHandler");

const webCommand = ({target}) => {
    const jiraUrlBase = readFromConfig("jiraUrlBase");
    let url;
    switch (target) {
        case "board":
            // TODO implement web board command
            // query JIRA_BASE_URL/rest/api/latest/dashboard
            // filter for one that has an item in its sharePermissions whose project's key matches
            break;
        case "backlog":
            // TODO implement web backlog command
            // same
            url = "";
            break;
        case "card":
            url = `${jiraUrlBase}/browse/${readActiveCardKey()}`;
            break;
        default:
            throw Error("unknown web target");
    }
    opn(url, {wait: false});
};

module.exports = {
    webCommand,
};
