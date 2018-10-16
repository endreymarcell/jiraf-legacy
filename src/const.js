var os = require("os");
var path = require("path");

const JIRAF_CONFIG_FILE = path.join(os.homedir(), ".jiraf/config.json");
const JIRAF_SESSION_FILE = path.join(os.homedir(), ".jiraf/session.json");
const JIRA_RESTAPI_URL = "/rest/api/2/";
const JIRA_CARD_URL = "issue/";
const JIRA_SEARCH_URL = "search";
const JIRA_TRANSITIONS_URL = "transitions/";

module.exports = {
    JIRAF_CONFIG_FILE,
    JIRAF_SESSION_FILE,
    JIRA_RESTAPI_URL,
    JIRA_CARD_URL,
    JIRA_SEARCH_URL,
    JIRA_TRANSITIONS_URL,
};
