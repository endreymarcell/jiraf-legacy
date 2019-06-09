const errorMessages = {
    unknownCommand: command => `unkonwn command '${command}'`,
    noProjectSet: "no project set; please set it with `jiraf setpropject <key>`",
    noCardSet: "no card set; please set it with `jiraf set <key>`",
    noAtlassianCredentials: "missing Atlassian credentials",
    noGithubCredentials: "missing GitHub credentials",
    missingArgument: argument => `missing argument '${argument}'`,
    cannotLoadCard: errorMessage => `loading card data from JIRA failed (${errorMessage})`,
    noProjectForPartialCardKey: "no project set, provide a full card key",
    unknownStatus: (newStatus, possibleStatuses) =>
        `Unknown status '${newStatus}', please choose from: ${possibleStatuses}.`,
    unknownStatusSlug: (statusSlug, possibleStatusSlugs) =>
        `Unknown status slug '${statusSlug}', please choose from: ${possibleStatusSlugs.join(", ")}.`,
    unknownWebTarget: "unknown web target, please choose from: card, board, backlog",
    cannotMoveCard: (newStatus, errorMessage) => `cannot move card to status '${newStatus}' (${errorMessage})`,
    cannotLoadBoard: (projectKey, errorMessage) =>
        `cannot load board for project key '${projectKey}' (${errorMessage})`,
    cannotLoadBoardConfig: (boardId, errorMessage) =>
        `cannot load configuration for board id '${boardId}' (${errorMessage})`,
    cannotLoadCardTransitionsForProject: (projectKey, errorMessage) =>
        `cannot load card transitions for project '${projectKey}' (${errorMessage})`,
    cannotListCardsOnBoard: (projectKey, errorMessage) =>
        `cannot list cards on the board for project key '${projectKey}' (${errorMessage})`,
    cannotListCardsInView: (projectKey, errorMessage) =>
        `cannot list cards on the board for rapidview id ${projectKey} (${errorMessage})`,
    cannotAssignCard: (cardKey, errorMessage) => `assigning card '${cardKey}' failed (${errorMessage})`,
    cannotCreatePR: errorMessage => `couldn't create pull request (${errorMessage})`,
    cannotCreateBranch: errorMessage => `couldn't create the new branch (${errorMessage})`,
    cannotLoadPRs: errorMessage => `couldn't load pull requests (${errorMessage})`,
};

module.exports = {
    errorMessages,
};
