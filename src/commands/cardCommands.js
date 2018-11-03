const {reloadAndUpdateCardData} = require("./sessionCommands");
const {JIRA_CARD_URL, JIRA_TRANSITIONS_URL} = require("../const");
const {readActiveCardKey} = require("../utils/storageHandler");
const {get, post, put} = require("../utils/jiraApi");
const {getSlugForStatus, print, die, generateDetails, getShortUsername} = require("../utils/utils");
const {errorMessages} = require("../utils/messages");

const detailsCommand = ({template}) => {
    if (readActiveCardKey()) {
        const details = generateDetails(template);
        print(details);
    } else {
        throw Error(errorMessages.noCardSet);
    }
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
                throw Error(errorMessages.unknownStatus(newStatus, possibleStatuses));
            }
            post(transitionsUrl, {transition: {id: statusId}}).then(() => {
                reloadAndUpdateCardData(readActiveCardKey());
            });
        })
        .catch(error => die(errorMessages.cannotMoveCard(newStatus, error.message)));
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
