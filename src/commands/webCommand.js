const opn = require("opn");
const {getActiveCardKey, getFromConfig} = require("../utils/storageHandler");

const webCommand = target => {
    const jira_url_base = getFromConfig("jira_url_base");
    let url;
    switch (target) {
        case "board":
            // query JIRA_BASE_URL/rest/api/latest/dashboard
            // filter for one that has an item in its sharePermissions whose project's key matches
            break;
        case "backlog":
            // same
            url = "";
            break;
        case "card":
            url = `${jira_url_base}/browse/${getActiveCardKey()}`;
            break;
        default:
            throw "unknown web target";
    }
    opn(url, {wait: false});
};

module.exports = {
    webCommand,
};
