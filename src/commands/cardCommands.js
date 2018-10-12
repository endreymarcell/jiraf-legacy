const getShortUsername = require("../utils/utils").getShortUsername;
const {JIRA_CARD_URL} = require("../const");
const {getActiveCardKey} = require("../utils/storageHandler");
const {put} = require("../utils/jiraApi");

const sendAssignRequest = assignee => {
    put(`${JIRA_CARD_URL}${getActiveCardKey()}/assignee`, {name: assignee});
}

const assignCardCommand = assignee => {
    sendAssignRequest(assignee ? assignee : getShortUsername());
};

const unassignCardCommand = () => {
    sendAssignRequest(null);
}

module.exports = {
    assignCardCommand,
    unassignCardCommand,
}
