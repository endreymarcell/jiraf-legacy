const fs = require("fs");
const {JIRAF_SESSION_FILE, JIRAF_CONFIG_FILE} = require("../const");

const getFromFile = (file, key) => {
    const contents = JSON.parse(fs.readFileSync(file));
    return contents[key];
};

const getFromConfig = key => {
    return getFromFile(JIRAF_CONFIG_FILE, key);
};

const getFromSession = key => {
    return getFromFile(JIRAF_SESSION_FILE, key);
};

const updateInSession = (key, value) => {
    const session = JSON.parse(fs.readFileSync(JIRAF_SESSION_FILE));
    session[key] = value;
    fs.writeFileSync(JIRAF_SESSION_FILE, JSON.stringify(session, null, "   "));
};

const updateMultipleInSession = keyValuePairs => {
    const session = JSON.parse(fs.readFileSync(JIRAF_SESSION_FILE));
    for (const [key, value] of keyValuePairs) {
        session[key] = value;
    }
    fs.writeFileSync(JIRAF_SESSION_FILE, JSON.stringify(session, null, "   "));
};

const getActiveProjectKey = () => {
    return getFromSession("activeProjectKey");
};

const getActiveCardKey = () => {
    return getFromSession("activeCardKey");
};

const getActiveCardDetails = () => {
    return getFromSession("activeCardDetails");
};

const getStatuses = () => {
    return getFromConfig("statuses");
};

module.exports = {
    getFromConfig,
    updateInSession,
    updateMultipleInSession,
    getActiveProjectKey,
    getActiveCardKey,
    getActiveCardDetails,
    getStatuses,
};
