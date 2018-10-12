const {updateInSession, getActiveProjectKey} = require("../utils/storageHandler");

const setProjectCommand = key => {
    updateInSession([["active_project_key", key]]);
};

const unsetProjectCommand = () => {
    updateInSession([["active_project_key", ""]]);
};

const setCardCommand = cardKey => {
    let fullKey;
    if (cardKey.indexOf("-") !== -1) {
        const cardProject = cardKey.split("-")[0];
        setProjectCommand(cardProject);
        fullKey = cardKey;
    } else {
        fullKey = getActiveProjectKey() + "-" + cardKey;
    }
    updateInSession([["active_card_key", fullKey]]);
};

const unsetCardCommand = () => {
    updateInSession([["active_card_key", ""], ["active_card_summary", ""]]);
};

module.exports = {
    setProjectCommand,
    unsetProjectCommand,
    setCardCommand,
    unsetCardCommand,
};
