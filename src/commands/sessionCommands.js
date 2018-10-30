const {updateInSession, updateMultipleInSession, readActiveProjectKey} = require("../utils/storageHandler");
const {JIRA_SEARCH_URL, JIRA_BOARD_URL, JIRA_BOARD_CONFIGURATION_URL} = require("../const");
const {get} = require("../utils/jiraApi");

const setProjectCommand = options => {
    const key = options.project;
    updateMultipleInSession([["activeProjectKey", key], ["statuses", []]]);
    // TODO do this async:
    loadStatuses();
};

const loadStatuses = () => {
    get(`${JIRA_BOARD_URL}?projectKeyOrId=${readActiveProjectKey()}`).then(response => {
        const boardId = response.data.values[0].id;
        get(`${JIRA_BOARD_URL}${boardId}${JIRA_BOARD_CONFIGURATION_URL}`).then(response => {
            const columns = response.data.columnConfig.columns;
            get(
                JIRA_SEARCH_URL +
                    "?fields=transitions&expand=transitions&maxResults=1" +
                    `&jql=project = ${readActiveProjectKey()} AND Sprint in openSprints()`
            ).then(response => {
                const statusMap = {};
                response.data.issues[0].transitions.forEach(status => {
                    statusMap[status.to.id] = status.to.name;
                });
                const statusList = [];
                for (let i = 0; i < columns.length; i++) {
                    columns[i].statuses.forEach(status => {
                        statusList.push(statusMap[status.id]);
                    });
                }
                updateInSession("statuses", statusList);
            });
        });
    });
};

const unsetProjectCommand = () => {
    updateInSession("activeProjectKey", "");
};

const setCardCommand = options => {
    const key = options.card.split(" ")[0];
    let fullKey;
    if (key.indexOf("-") !== -1) {
        const cardProject = key.split("-")[0];
        setProjectCommand({project: cardProject});
        fullKey = key;
    } else {
        fullKey = readActiveProjectKey() + "-" + key;
    }
    updateInSession("activeCardKey", fullKey);
};

const unsetCardCommand = () => {
    updateInSession("activeCardKey", "");
};

module.exports = {
    setProjectCommand,
    unsetProjectCommand,
    setCardCommand,
    unsetCardCommand,
};
