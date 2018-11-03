const express = require("express");
const {JIRA_BOARD_URL} = require("../../src/const");
const app = express();

app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
});

app.get("/debug", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({mock: "JIRA"}));
});

app.get(JIRA_BOARD_URL, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({mock: "JIRA"}));
});

app.listen(80, "127.0.0.1");
