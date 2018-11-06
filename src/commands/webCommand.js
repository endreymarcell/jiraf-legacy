const opn = require("opn");

const {JIRA_BOARD_URL, JIRA_BOARD_HTML_URL, JIRA_BACKLOG_URL} = require("../const");
const {readActiveCardKey, readActiveProjectKey, readFromConfig} = require("../utils/storageHandler");
const {get} = require("../utils/jiraApi");
const {errorMessages} = require("../utils/messages");

const webCommand = ({target}) => {
    let projectKey;
    let cardKey;
    const jiraUrlBase = readFromConfig("jiraUrlBase");
    let url;
    switch (target) {
        case undefined:
        case "board":
            projectKey = readActiveProjectKey();
            if (!projectKey) {
                throw Error(errorMessages.noProjectSet);
            }
            get(`${JIRA_BOARD_URL}?projectKeyOrId=${projectKey}`).then(response => {
                const boardId = response.data.values[0].id;
                url = `${jiraUrlBase}${JIRA_BOARD_HTML_URL}${boardId}`;
                opn(url, {wait: false});
            });
            break;
        case "backlog":
            projectKey = readActiveProjectKey();
            if (!projectKey) {
                throw Error(errorMessages.noProjectSet);
            }
            get(`${JIRA_BOARD_URL}?projectKeyOrId=${projectKey}`).then(response => {
                const boardId = response.data.values[0].id;
                url = `${jiraUrlBase}${JIRA_BOARD_HTML_URL}${boardId}${JIRA_BACKLOG_URL}`;
                opn(url, {wait: false});
            });
            url = "";
            break;
        case "card":
            cardKey = readActiveCardKey();
            if (!cardKey) {
                throw Error(errorMessages.noCardSet);
            }
            url = `${jiraUrlBase}/browse/${cardKey}`;
            opn(url, {wait: false});
            break;
        default:
            throw Error(errorMessages.unknownWebTarget);
    }
};

module.exports = {
    webCommand,
};
