const express = require("express");
const mockData = require("./mockData");
const {JIRA_SEARCH_URL, JIRA_BOARD_URL, JIRA_BOARD_CONFIGURATION_URL, JIRA_CARD_URL} = require("../../../src/const");
const {addJsonEndpoint} = require("../utils");

const app = express();

app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
});

app.get("/debug", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({mock: "JIRA"}));
});

addJsonEndpoint(app, JIRA_BOARD_URL, mockData.boardId);
addJsonEndpoint(app, `${JIRA_BOARD_URL}:boardId${JIRA_BOARD_CONFIGURATION_URL}`, mockData.boardConfig);
addJsonEndpoint(app, `${JIRA_CARD_URL}:cardKey`, mockData.cardDetailsTodo);

app.get(JIRA_SEARCH_URL, (req, res) => {
    let data;
    if (req.query.fields === "summary,status,issuetype,priority,assignee") {
        if (req.query.jql.indexOf('AND status = "Done"') !== -1) {
            data = {issues: [mockData.cardDetailsDone]};
        } else if (req.query.jql.indexOf("AND assignee = clint.eastwood") !== -1) {
            data = {issues: [mockData.cardDetailsTodo]};
        } else {
            data = mockData.cardsOnBoard;
        }
    } else if (req.query.fields === "transitions") {
        data = mockData.searchForOneCardTransitions;
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
});

app.listen(80, "127.0.0.1");
