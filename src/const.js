const os = require("os");
const path = require("path");

const JIRAF_HOME_FOLDER = path.join(os.homedir(), ".jiraf");
const JIRAF_CONFIG_FILE = path.join(JIRAF_HOME_FOLDER, "config.json");
const JIRAF_SESSION_FILE = path.join(JIRAF_HOME_FOLDER, "session.json");
const JIRA_RESTAPI_URL = "/rest/api/2/";
const JIRA_CARD_URL = "issue/";
const JIRA_SEARCH_URL = "search";
const JIRA_TRANSITIONS_URL = "transitions/";

const DEFAULT_STATUS_PATTERN = "{{key}} [{{status}}] {{title}} ({{assignee}})";

const PULL_REQUEST_TEMPLATE = `[{{key}}] 
### What does it do?

### Related links (kanban card, google docs, etc.)
{{jiraUrlBase}}/browse/{{key}}

### Comments

### Please review
`;

module.exports = {
    JIRAF_HOME_FOLDER,
    JIRAF_CONFIG_FILE,
    JIRAF_SESSION_FILE,
    JIRA_RESTAPI_URL,
    JIRA_CARD_URL,
    JIRA_SEARCH_URL,
    JIRA_TRANSITIONS_URL,
    DEFAULT_STATUS_PATTERN,
    PULL_REQUEST_TEMPLATE,
};
