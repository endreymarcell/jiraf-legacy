const fs = require("fs");
const {JIRAF_CONFIG_FILE} = require("../../../src/const");

const resetConfig = () => {
    fs.copyFileSync("/jiraf/test/assets/config.json", JIRAF_CONFIG_FILE);
};

module.exports = {
    resetConfig,
};
