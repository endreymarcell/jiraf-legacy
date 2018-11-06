const fs = require("fs");
const {JIRAF_CONFIG_FILE} = require("../../../src/const");
const {clearSession, clearStatus} = require("../../../src/utils/storageHandler");

const resetConfig = () => {
    fs.copyFileSync("/jiraf/test/assets/config.json", JIRAF_CONFIG_FILE);
};

const clearBeforeTests = () => {
    resetConfig();
    clearSession();
    clearStatus();
};

module.exports = {
    resetConfig,
    clearBeforeTests,
};
