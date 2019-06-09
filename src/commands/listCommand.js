const {
    rightPad,
    getShortUsername,
    getStatusForSlug,
    parseCardResponse,
    print,
    die,
    isNumeric,
} = require("../utils/utils");
const {JIRA_SEARCH_URL, JIRA_BOARD_URL} = require("../const");
const {readActiveProjectKey, readStatuses} = require("../utils/storageHandler");
const {get} = require("../utils/jiraApi");
const {errorMessages} = require("../utils/messages");

const listCardsCommand = ({status: statusSlug, assignee}) => {
    const projectKey = readActiveProjectKey();
    if (!projectKey) {
        throw Error(errorMessages.noProjectSet);
    }
    if (isNumeric(projectKey)) {
        loadCardsInView(projectKey, statusSlug, assignee)
            .then(parsedResponse => printCards(parsedResponse))
            .catch(error => die(errorMessages.cannotListCardsInView(projectKey, error.message)));
    } else {
        loadCardsOnBoard(projectKey, statusSlug, assignee)
            .then(parsedResponse => printCards(parsedResponse))
            .catch(error => die(errorMessages.cannotListCardsOnBoard(projectKey, error.message)));
    }
};

const loadCardsOnBoard = (projectKey, statusSlug, assignee) => {
    const baseSearchUrl =
        JIRA_SEARCH_URL +
        "?fields=summary,status,issuetype,priority,assignee" +
        `&jql=project = ${projectKey} AND Sprint in openSprints()`;
    const filtersUrl = generateFiltersUrl(statusSlug, assignee);
    return get(baseSearchUrl + filtersUrl)
        .then(response => parseBoardResponse(response))
        .catch(error => die(error.message));
};

const loadCardsInView = (projectKey, statusSlug, assignee) => {
    const baseSearchUrl =
        `${JIRA_BOARD_URL}${projectKey}/issue` +
        "?fields=summary,status,issuetype,priority,assignee" +
        "&jql=status!=Done%20and%20status!=New%20and%20status!=%22Won\\%27t%20do%22";
    const filtersUrl = generateFiltersUrl(statusSlug, assignee);
    return get(baseSearchUrl + filtersUrl)
        .then(response => parseBoardResponse(response))
        .catch(error => die(error.message));
};

const generateFiltersUrl = (statusSlug, assignee) => {
    const filterStrings = [""];
    if (statusSlug) {
        const status = getStatusForSlug(statusSlug);
        filterStrings.push(`status = "${status}"`);
    }
    const isAssigneeSwitchSetButNoAssigneeSpecified = assignee === null;
    if (isAssigneeSwitchSetButNoAssigneeSpecified) {
        filterStrings.push(`assignee = ${getShortUsername()}`);
    } else if (assignee === "unassigned") {
        filterStrings.push(`assignee = EMPTY`);
    } else if (assignee) {
        filterStrings.push(`assignee = ${assignee}`);
    }
    return filterStrings.join(" AND ");
};

const parseBoardResponse = response => {
    return response.data.issues
        .map(card => parseCardResponse(card))
        .sort((a, b) => (getIndexForStatus(a.status) < getIndexForStatus(b.status) ? -1 : 1));
};

const printCards = cards => {
    cards.forEach(card => printSingleCard(card));
};

const printSingleCard = card => {
    print(formatSingleCardSummary(card));
};

const formatSingleCardSummary = card => {
    return [
        `${card.key}`,
        rightPad(`[${card.status}]`, 13),
        `${card.summary}`,
        `(${card.assignee || "unassigned"})`,
    ].join(" ");
};

const getIndexForStatus = status => {
    return readStatuses().indexOf(status);
};

module.exports = {
    listCardsCommand,
};
