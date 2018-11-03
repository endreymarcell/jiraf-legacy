const os = require("os");
const path = require("path");

const JIRAF_HOME_FOLDER = path.join(os.homedir(), ".jiraf");
const JIRAF_CONFIG_FILE = path.join(JIRAF_HOME_FOLDER, "config.json");
const JIRAF_SESSION_FILE = path.join(JIRAF_HOME_FOLDER, "session.json");
const JIRAF_STATUS_FILE = path.join(JIRAF_HOME_FOLDER, "status");

const JIRA_CARD_URL = "/rest/api/2/issue/";
const JIRA_SEARCH_URL = "/rest/api/2/search";
const JIRA_TRANSITIONS_URL = "/transitions/";
const JIRA_PULL_REQUEST_URL = "/rest/dev-status/1.0/issue/detail?applicationType=github&dataType=pullrequest&issueId=";
const JIRA_BOARD_URL = "/rest/agile/1.0/board/";
const JIRA_BOARD_HTML_URL = "/secure/RapidBoard.jspa?rapidView=";
const JIRA_BOARD_CONFIGURATION_URL = "/configuration";
const JIRA_BACKLOG_URL = "&view=planning.nodetail";

const GITHUB_URL_BASE = "https://api.github.com";

const DEFAULT_STATUS_TEMPLATE = "({{key}}) ";
const DEFAULT_DETAILS_TEMPLATE = "{{key}} [{{status}}] {{summary}} ({{assignee}}) ";

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
    JIRAF_STATUS_FILE,
    JIRA_CARD_URL,
    JIRA_SEARCH_URL,
    JIRA_TRANSITIONS_URL,
    JIRA_PULL_REQUEST_URL,
    JIRA_BOARD_URL,
    JIRA_BOARD_HTML_URL,
    JIRA_BOARD_CONFIGURATION_URL,
    JIRA_BACKLOG_URL,
    GITHUB_URL_BASE,
    DEFAULT_STATUS_TEMPLATE,
    DEFAULT_DETAILS_TEMPLATE,
    PULL_REQUEST_TEMPLATE,
};
