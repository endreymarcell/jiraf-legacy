const opn = require("opn");

const {JIRA_BOARD_URL, JIRA_BOARD_HTML_URL, JIRA_BACKLOG_URL} = require("../const");
const {readActiveCardKey, readActiveProjectKey, readFromConfig} = require("../utils/storageHandler");
const {get} = require("../utils/jiraApi");
const {errorMessages} = require("../utils/messages");

const webCommand = ({target}) => {
    const jiraUrlBase = readFromConfig("jiraUrlBase");
    let url;
    switch (target) {
        case undefined:
        case "board":
            get(`${JIRA_BOARD_URL}?projectKeyOrId=${readActiveProjectKey()}`).then(response => {
                const boardId = response.data.values[0].id;
                url = `${jiraUrlBase}${JIRA_BOARD_HTML_URL}${boardId}`;
                opn(url, {wait: false});
            });
            break;
        case "backlog":
            get(`${JIRA_BOARD_URL}?projectKeyOrId=${readActiveProjectKey()}`).then(response => {
                const boardId = response.data.values[0].id;
                url = `${jiraUrlBase}${JIRA_BOARD_HTML_URL}${boardId}${JIRA_BACKLOG_URL}`;
                opn(url, {wait: false});
            });
            url = "";
            break;
        case "card":
            url = `${jiraUrlBase}/browse/${readActiveCardKey()}`;
            opn(url, {wait: false});
            break;
        default:
            throw Error(errorMessages.unknownWebTarget);
    }
};

module.exports = {
    webCommand,
};
