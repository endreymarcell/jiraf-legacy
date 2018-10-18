const axios = require("axios");
const {exec} = require("child_process");

const {getActiveCardKey} = require("../utils/storageHandler");

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

const checkCommand = () => {
    // TODO
    // /rest/dev-status/1.0/issue/detail?issueId=141163&applicationType=github&dataType=pullrequest
};

const prCommand = () => {
    const {GITHUB_USERNAME, GITHUB_API_TOKEN} = process.env;
    if (!GITHUB_USERNAME || !GITHUB_API_TOKEN) {
        console.error("missing github credentials");
        process.exit(1);
    }
    exec("git ls-remote --get-url origin", (error, stdout, stderr) => {
        const repoUrl = stdout;
        exec("git rev-parse --abbrev-ref HEAD", (error, stdout, stderr) => {
            const branchName = stdout;

            exec(`git push origin ${branchName}`, (error, stdout, stderr) => {
                axios({
                    method: "post",
                    url: `https://github.com/`,
                    auth: {
                        username: GITHUB_USERNAME,
                        password: GITHUB_API_TOKEN,
                    },
                    data: {
                        title: "PR title",
                        head: branchName,
                        base: "master",
                        body: "PR contents",
                    },
                });
            });
        });
    });
};

module.exports = {
    branchCommand,
    checkCommand,
    prCommand,
};
