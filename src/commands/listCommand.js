const {rightPad, getShortUsername, getStatusForSlug, parseCardResponse, print, die} = require("../utils/utils");
const {JIRA_SEARCH_URL} = require("../const");
const {readActiveProjectKey, readStatuses} = require("../utils/storageHandler");
const {get} = require("../utils/jiraApi");

const listCardsCommand = ({statusSlug, assignee}) => {
    const projectKey = readActiveProjectKey();
    if (projectKey) {
        loadCardsOnBoard(projectKey, statusSlug, assignee).then(parsedResponse => printCards(parsedResponse));
    } else {
        throw Error("no project set; please set it with `jiraf setpropject <key>`");
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
