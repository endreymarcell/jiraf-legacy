const fs = require("fs");
const {JIRAF_CONFIG_FILE} = require("./const");

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

fs.writeFileSync(JIRAF_CONFIG_FILE, JSON.stringify(defaultConfig, null, "   "));
