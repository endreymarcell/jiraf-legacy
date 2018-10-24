const getShortUsername = require("../utils/utils").getShortUsername;
const {JIRA_CARD_URL, JIRA_TRANSITIONS_URL} = require("../const");
const {getActiveCardKey} = require("../utils/storageHandler");
const {get, post, put} = require("../utils/jiraApi");
const {getSlugForStatus} = require("../utils/utils");

const sendAssignRequest = assignee => {
    put(`${JIRA_CARD_URL}${getActiveCardKey()}/assignee`, {name: assignee});
};

const assignCardCommand = ({assignee: assignee}) => {
    sendAssignRequest(assignee ? assignee : getShortUsername());
};

const unassignCardCommand = () => {
    sendAssignRequest(null);
};

const moveCommand = ({status: newStatus}) => {
    const cardKey = getActiveCardKey();
    const transitionsUrl = `${JIRA_CARD_URL}${cardKey}/${JIRA_TRANSITIONS_URL}`;
    get(transitionsUrl)
        .then(transitions => parseTransitions(transitions.data.transitions))
        .then(transitions => {
            const statusId = transitions[newStatus];
            if (statusId === undefined) {
                const possibleStatuses = Object.keys(transitions).join(", ");
                console.error(`Unknown status '${newStatus}', please choose from: ${possibleStatuses}.`);
                throw Error("unknown status");
            }
            post(transitionsUrl, {transition: {id: statusId}});
        })
        .catch(error => console.error(error));
};

const parseTransitions = transitions => {
    const statusSlugsToIds = {};
    transitions.forEach(transition => {
        statusSlugsToIds[getSlugForStatus(transition.name)] = transition.id;
    });
    return statusSlugsToIds;
};

module.exports = {
    moveCommand,
    assignCardCommand,
    unassignCardCommand,
};
