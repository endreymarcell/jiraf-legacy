const errorMessages = {
    unknownCommand: command => `unkonwn command '${command}'`,
    noProjectSet: "no project set; please set it with `jiraf setpropject <key>`",
    noCardSet: "no card set; please set it with `jiraf set <key>`",
    noAtlassianCredentials: "missing Atlassian credentials",
    noGithubCredentials: "missing GitHub credentials",
    missingArgument: argument => `missing argument '${argument}'`,
    noProjectForPartialCardKey: "no project set, provide a full card key",
    unknownStatus: (newStatus, possibleStatuses) =>
        `Unknown status '${newStatus}', please choose from: ${possibleStatuses}.`,
    unknownWebTarget: "unknown web target, please choose from: card, board, backlog",
    cannotMoveCard: (newStatus, errorMessage) => `cannot move card to status ${newStatus} (${errorMessage})`,
};

module.exports = {
    errorMessages,
};
