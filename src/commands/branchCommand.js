const getActiveCardKey = require("../utils/storageHandler").getActiveCardKey;
const {exec} = require("child_process");

const branchCommand = branchOptions => {
    const prefix = branchOptions["prefix-with-card-key"] ? `${getActiveCardKey()}-` : "";
    exec(`git checkout -b ${prefix}${branchOptions.branchName}`, (error, stdout, stderr) => {
        if (error != null) {
            console.error(stderr);
            throw error.message;
        } else {
            console.log(stdout);
        }
    });
};

module.exports = {
    branchCommand,
};
