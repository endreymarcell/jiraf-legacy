const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const mockData = require("./mockData");
const {
    JIRA_SEARCH_URL,
    JIRA_BOARD_URL,
    JIRA_BOARD_CONFIGURATION_URL,
    JIRA_CARD_URL,
    JIRA_TRANSITIONS_URL,
} = require("../../../src/const");
const {addJsonGetEndpoint, addJsonPutEndpoint, addJsonPostEndpoint} = require("../utils");
const {JIRA_MOCK_LOGFILE} = require("../../test-cases/const");

const app = express();
app.use(bodyParser.json());

app.get("/healthcheck", (req, res) => res.sendStatus(200));

app.get("/debug", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({mock: "JIRA"}));
});

app.get(JIRA_BOARD_URL, (req, res) => {
    if (req.query.projectKeyOrId === "NOSUCHPROJECT") {
        res.sendStatus(404);
    } else {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(mockData.boardId));
    }
});
addJsonGetEndpoint(app, `${JIRA_BOARD_URL}:boardId${JIRA_BOARD_CONFIGURATION_URL}`, mockData.boardConfig);
addJsonGetEndpoint(app, `${JIRA_CARD_URL}ASSIGNSNOOPDOGG-123`, mockData.cardDetails.snoopDogg);
addJsonGetEndpoint(app, `${JIRA_CARD_URL}UNASSIGN-123`, mockData.cardDetails.unassign);

app.get(`${JIRA_CARD_URL}:cardKey`, (req, res) => {
    let data;
    if (req.params.cardKey === "NOSUCHCARD-123") {
        res.sendStatus(404);
        return;
    } else if (req.params.cardKey === "NOPR-1") {
        data = {id: 1};
    } else if (req.params.cardKey === "ONEPR-1") {
        data = {id: 2};
    } else if (req.params.cardKey === "MOREPRS-1") {
        data = {id: 3};
    } else {
        data = mockData.cardDetails.todo;
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
});
addJsonGetEndpoint(app, `${JIRA_CARD_URL}:cardKey${JIRA_TRANSITIONS_URL}`, mockData.activeCardsTransitions);

app.get(JIRA_SEARCH_URL, (req, res) => {
    let data;
    if (req.query.fields === "summary,status,issuetype,priority,assignee") {
        if (req.query.jql.indexOf('AND status = "Done"') !== -1) {
            data = {issues: [mockData.cardDetails.done]};
        } else if (req.query.jql.indexOf("AND assignee = clint.eastwood") !== -1) {
            data = {issues: [mockData.cardDetails.todo]};
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
addJsonPutEndpoint(app, `${JIRA_CARD_URL}ASSIGNSNOOPDOGG-123/assignee`, 200);
addJsonPutEndpoint(app, `${JIRA_CARD_URL}UNASSIGN-123/assignee`, 200);

app.put(`${JIRA_CARD_URL}ASSIGNWRITE-123/assignee`, (req, res) => {
    fs.writeFile(JIRA_MOCK_LOGFILE, req.body.name, {}, () => res.sendStatus(200));
});

addJsonPostEndpoint(app, `${JIRA_CARD_URL}:cardKey${JIRA_TRANSITIONS_URL}`, 200);

app.get("/rest/dev-status/1.0/issue/detail", (req, res) => {
    let data;
    if (req.query.applicationType === "github" && req.query.dataType === "pullrequest") {
        if (req.query.issueId === "1") {
            data = mockData.github.noPR;
        } else if (req.query.issueId === "2") {
            data = mockData.github.onePR;
        } else if (req.query.issueId === "3") {
            data = mockData.github.morePRs;
        }
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
});

app.listen(80, "127.0.0.1");
