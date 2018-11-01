const {getShortUsername} = require("../utils/utils");
const {JIRA_CARD_URL, JIRA_TRANSITIONS_URL, DEFAULT_STATUS_PATTERN} = require("../const");
const {readActiveCardKey, readActiveCardDetails} = require("../utils/storageHandler");
const {get, post, put} = require("../utils/jiraApi");
const {getSlugForStatus, interpolate, print, die} = require("../utils/utils");
const {loadSingleCard} = require("./sessionCommands");

const statusCommand = ({pattern}) => {
    const activeCardDetails = readActiveCardDetails();
    const status = interpolate(pattern || DEFAULT_STATUS_PATTERN, activeCardDetails);
    print(status || "");
};

const sendAssignRequest = assignee => {
    return put(`${JIRA_CARD_URL}${readActiveCardKey()}/assignee`, {name: assignee});
};

const assignCardCommand = ({assignee: assignee}) => {
    sendAssignRequest(assignee ? assignee : getShortUsername()).then(() => loadSingleCard(readActiveCardKey()));
};

const unassignCardCommand = () => {
    sendAssignRequest(null).then(() => loadSingleCard(readActiveCardKey()));
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
            post(transitionsUrl, {transition: {id: statusId}}).then(() => loadSingleCard(readActiveCardKey()));
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
    statusCommand,
    moveCommand,
    assignCardCommand,
    unassignCardCommand,
};
