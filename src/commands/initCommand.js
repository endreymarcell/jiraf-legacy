const fs = require("fs");
const {print} = require("../utils/utils");
const {JIRAF_CONFIG_FILE} = require("../const");
const {infoMessages} = require("../utils/messages");

const defaultConfig = {
    jiraUrlBase: "https://JIRAF.atlassian.net",
    editor: "vim",
    statusTemplate: "{{key}} [{{status}}] {{summary}} ({{assignee}})",
    shortcuts: {
        start: ["set {}", "assign", "move inprogress"],
        review: ["move codereview", "pr"],
        qa: ["move validation", "assign QA.PERSON"],
    },
};

const initCommand = () => {
    if (!fs.existsSync(JIRAF_CONFIG_FILE)) {
        print(infoMessages.configCreated);
        fs.writeFileSync(JIRAF_CONFIG_FILE, JSON.stringify(defaultConfig, null, "   "));
    }
};

module.exports = {
    initCommand,
};
