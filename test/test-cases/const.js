const path = require("path");
const {JIRAF_HOME_FOLDER} = require("../../src/const");

const JIRA_MOCK_LOGFILE = path.join(JIRAF_HOME_FOLDER, "jira_mock_logfile");

module.exports = {
    JIRA_MOCK_LOGFILE,
};
