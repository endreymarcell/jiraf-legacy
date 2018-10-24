const {rightPad, getShortUsername, getStatusForSlug} = require("../utils/utils");
const {JIRA_CARD_URL, JIRA_SEARCH_URL} = require("../const");
const {getActiveCardKey, getActiveProjectKey, getStatuses} = require("../utils/storageHandler");
const {get} = require("../utils/jiraApi");

const currentCardCommand = () => {
    const key = getActiveCardKey();
    if (key) {
        getCard(key);
    } else {
        console.warn("jiraf WARNING: no card set");
    }
};

const listCardsCommand = ({statusSlug: statusSlug, assignee: assignee}) => {
    const baseSearchUrl =
        JIRA_SEARCH_URL +
        "?fields=summary,status,issuetype,priority,assignee" +
        `&jql=project = ${getActiveProjectKey()} AND Sprint in openSprints()`;
    const filtersUrl = generateFiltersUrl(statusSlug, assignee);
    return get(baseSearchUrl + filtersUrl)
        .then(response => parseBoardResponse(response))
        .then(parsedResponse => printCards(parsedResponse))
        .catch(error => console.error(`jiraf ERROR: ${error.message}`));
};

const getCard = key => {
    return get(`${JIRA_CARD_URL}${key}?fields=summary,status,assignee`)
        .then(response => parseCardResponse(response.data))
        .then(parsedResponse => printSingleCard(parsedResponse))
        .catch(error => console.error(`jiraf ERROR: ${error.message}`));
};

const parseCardResponse = response => {
    return {
        key: response.key,
        summary: response.fields.summary,
        status: response.fields.status.name,
        assignee: response.fields.assignee ? response.fields.assignee.name : null,
    };
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
    console.log(formatSingleCardSummary(card));
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
    // TODO properly read the statuses and columns and sort accordingly, not based on config
    // https://prezidoc.atlassian.net/rest/agile/1.0/board/271/configuration
    return getStatuses().indexOf(status);
};

module.exports = {
    listCardsCommand,
    currentCardCommand,
};
