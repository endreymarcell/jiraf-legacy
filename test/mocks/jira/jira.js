const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const mockData = require("./mockData");
const {JIRA_SEARCH_URL, JIRA_BOARD_URL, JIRA_BOARD_CONFIGURATION_URL, JIRA_CARD_URL} = require("../../../src/const");
const {addJsonGetEndpoint, addJsonPutEndpoint} = require("../utils");
const {JIRA_MOCK_LOGFILE} = require("../../test-cases/const");

const app = express();
app.use(bodyParser.json());

app.get("/healthcheck", (req, res) => res.sendStatus(200));

app.get("/debug", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({mock: "JIRA"}));
});

addJsonGetEndpoint(app, JIRA_BOARD_URL, mockData.boardId);
addJsonGetEndpoint(app, `${JIRA_BOARD_URL}:boardId${JIRA_BOARD_CONFIGURATION_URL}`, mockData.boardConfig);
addJsonGetEndpoint(app, `${JIRA_CARD_URL}:cardKey`, mockData.cardDetailsTodo);

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

addJsonPutEndpoint(app, `${JIRA_CARD_URL}NOASSIGN-123/assignee`, 400);
addJsonPutEndpoint(app, `${JIRA_CARD_URL}ASSIGN-123/assignee`, 200);

app.put(`${JIRA_CARD_URL}ASSIGNWRITE-123/assignee`, (req, res) => {
    fs.writeFile(JIRA_MOCK_LOGFILE, req.body.name, {}, () => res.sendStatus(200));
});

app.listen(80, "127.0.0.1");
