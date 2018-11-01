const {reloadAndUpdateCardData} = require("./sessionCommands");
const {getShortUsername} = require("../utils/utils");
const {JIRA_CARD_URL, JIRA_TRANSITIONS_URL, DEFAULT_DETAILS_TEMPLATE} = require("../const");
const {readActiveCardKey} = require("../utils/storageHandler");
const {get, post, put} = require("../utils/jiraApi");
const {getSlugForStatus, print, die, generateStatus} = require("../utils/utils");

const detailsCommand = ({template}) => {
    const details = generateStatus(template || DEFAULT_DETAILS_TEMPLATE);
    print(details);
};

const sendAssignRequest = assignee => {
    return put(`${JIRA_CARD_URL}${readActiveCardKey()}/assignee`, {name: assignee});
};

const assignCardCommand = ({assignee}) => {
    sendAssignRequest(assignee ? assignee : getShortUsername()).then(() => {
        reloadAndUpdateCardData(readActiveCardKey());
    });
};

const unassignCardCommand = () => {
    sendAssignRequest(null).then(() => {
        reloadAndUpdateCardData(readActiveCardKey());
    });
};

const moveCommand = ({status: newStatus}) => {
    const cardKey = readActiveCardKey();
    const transitionsUrl = `${JIRA_CARD_URL}${cardKey}/${JIRA_TRANSITIONS_URL}`;
    get(transitionsUrl)
        .then(transitions => parseTransitions(transitions.data.transitions))
        .then(transitions => {
            const statusId = transitions[newStatus];
            if (statusId === undefined) {
                const possibleStatuses = Object.keys(transitions).join(", ");
                throw Error(`Unknown status '${newStatus}', please choose from: ${possibleStatuses}.`);
            }
            post(transitionsUrl, {transition: {id: statusId}}).then(() => {
                reloadAndUpdateCardData(readActiveCardKey());
            });
        })
        .catch(error => die(`cannot move card to status ${newStatus} (${error.message})`));
};

const parseTransitions = transitions => {
    const statusSlugsToIds = {};
    transitions.forEach(transition => {
        statusSlugsToIds[getSlugForStatus(transition.name)] = transition.id;
    });
    return statusSlugsToIds;
};

module.exports = {
    detailsCommand,
    moveCommand,
    assignCardCommand,
    unassignCardCommand,
};
