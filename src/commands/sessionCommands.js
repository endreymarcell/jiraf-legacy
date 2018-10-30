const {
    updateInSession,
    updateMultipleInSession,
    readActiveProjectKey,
    readActiveCardKey,
} = require("../utils/storageHandler");
const {JIRA_SEARCH_URL, JIRA_BOARD_URL, JIRA_BOARD_CONFIGURATION_URL, JIRA_CARD_URL} = require("../const");
const {get} = require("../utils/jiraApi");
const {parseCardResponse} = require("../utils/utils");

const setProjectCommand = options => {
    const projectKey = options.project;
    updateMultipleInSession([{key: "activeProjectKey", value: projectKey}, {key: "statuses", value: []}]);
    loadStatuses(projectKey);
};

const refreshProjectCommand = () => {
    const projectKey = readActiveProjectKey();
    if (projectKey) {
        loadStatuses(projectKey);
    } else {
        console.warn("jiraf WARNING: no project set");
    }
};

const loadStatuses = projectKey => {
    get(`${JIRA_BOARD_URL}?projectKeyOrId=${projectKey}`).then(response => {
        const boardId = response.data.values[0].id;
        get(`${JIRA_BOARD_URL}${boardId}${JIRA_BOARD_CONFIGURATION_URL}`).then(response => {
            const columns = response.data.columnConfig.columns;
            get(
                JIRA_SEARCH_URL +
                    "?fields=transitions&expand=transitions&maxResults=1" +
                    `&jql=project = ${readActiveProjectKey()}`
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
    updateMultipleInSession([{key: "activeProjectKey", value: ""}, {key: "statuses", value: []}]);
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
    updateMultipleInSession([{key: "activeCardKey", value: fullKey}, {key: "activeCardDetails", value: {}}]);
    loadSingleCard(fullKey);
};

const refreshCardCommand = () => {
    const key = readActiveCardKey();
    if (key) {
        loadSingleCard(key);
    } else {
        console.warn("jiraf WARNING: no card set");
    }
};

const loadSingleCard = key => {
    get(`${JIRA_CARD_URL}${key}?fields=summary,status,assignee,description,priority,customfield_10005`)
        .then(response => parseCardResponse(response.data))
        .then(cardDetails => updateInSession("activeCardDetails", cardDetails))
        .catch(error => console.error(`jiraf ERROR: ${error.message}`));
};

const unsetCardCommand = () => {
    updateMultipleInSession([{key: "activeCardKey", value: ""}, {key: "activeCardDetails", value: {}}]);
};

module.exports = {
    setProjectCommand,
    refreshProjectCommand,
    unsetProjectCommand,
    setCardCommand,
    refreshCardCommand,
    unsetCardCommand,
    loadSingleCard,
};
