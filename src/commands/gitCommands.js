const axios = require("axios");
const {exec} = require("child_process");

const {JIRA_CARD_URL} = require("../const");
const {get} = require("../utils/jiraApi");
const {readActiveCardKey, readFromConfig} = require("../utils/storageHandler");

const {ATLASSIAN_USERNAME, ATLASSIAN_API_TOKEN} = process.env;
if (!ATLASSIAN_USERNAME || !ATLASSIAN_API_TOKEN) {
    throw Error("missing Atlassian credentials");
}

const branchCommand = branchOptions => {
    const prefix = branchOptions["prefix-with-card-key"] ? `${readActiveCardKey()}-` : "";
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
    const JIRA_URL_BASE = readFromConfig("jiraUrlBase");
    get(`${JIRA_CARD_URL}${readActiveCardKey()}?fields=''`).then(response => {
        const issueId = response.data.id;
        const url =
            JIRA_URL_BASE +
            "/rest/dev-status/1.0/issue/detail?applicationType=github&dataType=pullrequest" +
            `&issueId=${issueId}`;
        // newsflash, there's not only an 'api' endpoint but also a 'dev-status'
        // TODO extend the jiraApi to handle dev-status URLs as well, don't use axios directly here
        axios({
            url: url,
            method: "get",
            auth: {
                username: ATLASSIAN_USERNAME,
                password: ATLASSIAN_API_TOKEN,
            },
        }).then(response => {
            const pullRequests = response.data.detail[0].pullRequests;
            if (pullRequests.length > 0) {
                pullRequests.forEach(pullRequest => console.log(pullRequest.url));
            }
        });
    });
};

const prCommand = () => {
    // TODO implement the PR command
    const {GITHUB_USERNAME, GITHUB_API_TOKEN} = process.env;
    if (!GITHUB_USERNAME || !GITHUB_API_TOKEN) {
        throw Error("missing github credentials");
    }
    exec("git ls-remote --get-url origin", (error, stdout) => {
        const [owner, repo] = getRepoCoordinates(stdout);
        exec("git rev-parse --abbrev-ref HEAD", (error, stdout) => {
            const branchName = stdout.trim();
            exec(`git push --set-upstream origin ${branchName}`, () => {
                axios({
                    method: "post",
                    url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
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
                })
                    .then(response => console.log(response.data.url))
                    .catch(error => console.log(error.response));
            });
        });
    });
};

const getRepoCoordinates = remote => {
    return remote
        .trim()
        .replace("https://github.com/", "")
        .replace("git@github.com:", "")
        .replace(".git", "")
        .split("/");
};

module.exports = {
    branchCommand,
    checkCommand,
    prCommand,
};
