const fs = require("fs");
const {execSync} = require("child_process");

const {OPN_MOCK_LOGFILE} = require("../const");
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

const prepareMockBrowser = () => {
    const mockBrowserPath = "/usr/bin/www-browser";
    const mockBrowserCode = `#!/bin/bash
        echo "$@" > ${OPN_MOCK_LOGFILE}
    `;
    fs.writeFileSync(mockBrowserPath, mockBrowserCode);
    execSync(`chmod +x ${mockBrowserPath}`);
    fs.writeFileSync(OPN_MOCK_LOGFILE, "");
};

module.exports = {
    resetConfig,
    clearBeforeTests,
    prepareMockBrowser,
};
