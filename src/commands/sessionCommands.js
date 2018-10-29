const {updateInSession, readActiveProjectKey} = require("../utils/storageHandler");

const setProjectCommand = options => {
    const key = options.project;
    updateInSession("activeProjectKey", key);
};

const unsetProjectCommand = () => {
    updateInSession("activeProjectKey", "");
};

const setCardCommand = options => {
    const key = options.card.split(" ")[0];
    let fullKey;
    if (key.indexOf("-") !== -1) {
        const cardProject = key.split("-")[0];
        setProjectCommand({project: cardProject});
        fullKey = key;
    } else {
        fullKey = readActiveProjectKey() + "-" + key;
    }
    updateInSession("activeCardKey", fullKey);
};

const unsetCardCommand = () => {
    updateInSession("activeCardKey", "");
};

module.exports = {
    setProjectCommand,
    unsetProjectCommand,
    setCardCommand,
    unsetCardCommand,
};
