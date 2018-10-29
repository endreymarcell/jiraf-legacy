const os = require("os");
const path = require("path");

const JIRAF_HOME_FOLDER = path.join(os.homedir(), ".jiraf");
const JIRAF_CONFIG_FILE = path.join(JIRAF_HOME_FOLDER, "config.json");
const JIRAF_SESSION_FILE = path.join(JIRAF_HOME_FOLDER, "session.json");
const JIRA_CARD_URL = "/rest/api/2/issue/";
const JIRA_SEARCH_URL = "/rest/api/2/search";
const JIRA_TRANSITIONS_URL = "/rest/api/2/transitions/";
const JIRA_PULL_REQUEST_URL = "/rest/dev-status/1.0/issue/detail?applicationType=github&dataType=pullrequest&issueId=";

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
    JIRA_CARD_URL,
    JIRA_SEARCH_URL,
    JIRA_TRANSITIONS_URL,
    JIRA_PULL_REQUEST_URL,
    DEFAULT_STATUS_PATTERN,
    PULL_REQUEST_TEMPLATE,
};
