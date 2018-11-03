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

addJsonEndpoint(app, JIRA_SEARCH_URL, mockData.searchForOneCardTransitions);
addJsonEndpoint(app, JIRA_BOARD_URL, mockData.boardId);
addJsonEndpoint(app, `${JIRA_BOARD_URL}:boardId${JIRA_BOARD_CONFIGURATION_URL}`, mockData.boardConfig);
addJsonEndpoint(app, `${JIRA_CARD_URL}:cardKey`, mockData.cardDetails);

app.listen(80, "127.0.0.1");
