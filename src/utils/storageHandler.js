const fs = require("fs");
const {JIRAF_STATUS_FILE, JIRAF_SESSION_FILE, JIRAF_CONFIG_FILE} = require("../const");

const readFromFile = (file, key) => {
    const contents = JSON.parse(fs.readFileSync(file));
    return contents[key];
};

const readFromConfig = key => {
    return readFromFile(JIRAF_CONFIG_FILE, key);
};

const readFromSession = key => {
    return readFromFile(JIRAF_SESSION_FILE, key);
};

const updateInSession = (key, value) => {
    const session = JSON.parse(fs.existsSync(JIRAF_SESSION_FILE) ? fs.readFileSync(JIRAF_SESSION_FILE) : {});
    session[key] = value;
    fs.writeFileSync(JIRAF_SESSION_FILE, JSON.stringify(session, null, "   "));
};

const updateMultipleInSession = keyValuePairs => {
    const session = fs.existsSync(JIRAF_SESSION_FILE) ? JSON.parse(fs.readFileSync(JIRAF_SESSION_FILE)) : {};
    for (const {key, value} of keyValuePairs) {
        session[key] = value;
    }
    fs.writeFileSync(JIRAF_SESSION_FILE, JSON.stringify(session, null, "   "));
};

const readActiveProjectKey = () => {
    return readFromSession("activeProjectKey");
};

const readActiveCardKey = () => {
    return readFromSession("activeCardKey");
};

const readActiveCardDetails = () => {
    return readFromSession("activeCardDetails");
};

const readStatuses = () => {
    return readFromSession("statuses");
};

const updateStatusFile = status => {
    fs.writeFile(JIRAF_STATUS_FILE, status, () => {});
};

module.exports = {
    readFromConfig,
    updateInSession,
    updateMultipleInSession,
    readActiveProjectKey,
    readActiveCardKey,
    readActiveCardDetails,
    readStatuses,
    updateStatusFile,
};
