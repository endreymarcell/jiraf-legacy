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

const updateInFile = (file, key, value) => {
    const contents = JSON.parse(fs.existsSync(file) ? fs.readFileSync(file) : {});
    contents[key] = value;
    fs.writeFileSync(file, JSON.stringify(contents, null, "   "));
};

const updateInConfig = (key, value) => {
    updateInFile(JIRAF_CONFIG_FILE, key, value);
};

const updateInSession = (key, value) => {
    updateInFile(JIRAF_SESSION_FILE, key, value);
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

const clearSession = () => {
    fs.writeFileSync(JIRAF_SESSION_FILE, "{}");
};

module.exports = {
    readFromConfig,
    updateInConfig,
    updateInSession,
    updateMultipleInSession,
    readActiveProjectKey,
    readActiveCardKey,
    readActiveCardDetails,
    readStatuses,
    updateStatusFile,
    clearSession,
};
