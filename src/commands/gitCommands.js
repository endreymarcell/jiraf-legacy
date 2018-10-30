const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const {exec} = require("child_process");

const axios = require("axios");

const {JIRAF_HOME_FOLDER, JIRA_CARD_URL, JIRA_PULL_REQUEST_URL, PULL_REQUEST_TEMPLATE} = require("../const");
const {get} = require("../utils/jiraApi");
const {readActiveCardKey, readFromConfig} = require("../utils/storageHandler");
const {interpolate} = require("../utils/utils");

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
    get(`${JIRA_CARD_URL}${readActiveCardKey()}?fields=''`).then(response => {
        const issueId = response.data.id;
        get(`${JIRA_PULL_REQUEST_URL}${issueId}`).then(response => {
            const pullRequests = response.data.detail[0].pullRequests;
            if (pullRequests.length > 0) {
                pullRequests.forEach(pullRequest => console.log(pullRequest.url));
            }
        });
    });
};

const prCommand = () => {
    exec("git ls-remote --get-url origin", (error, stdout) => {
        const {owner, repo} = getRepoCoordinates(stdout);
        exec("git rev-parse --abbrev-ref HEAD", (error, stdout) => {
            const branchName = stdout.trim();
            exec(
                `git push --set-upstream origin ${branchName}`,
                editDescriptionAndCreatePullRequest({owner, repo, branchName})
            );
        });
    });
};

const editDescriptionAndCreatePullRequest = ({owner, repo, branchName}) => {
    const editor = readFromConfig("editor");
    const descriptionFileName = path.join(
        JIRAF_HOME_FOLDER,
        `pullrequest.${crypto.randomBytes(20).toString("hex")}.md`
    );
    const preparedTemplate = interpolate(PULL_REQUEST_TEMPLATE, {
        key: readActiveCardKey(),
        jiraUrlBase: readFromConfig("jiraUrlBase"),
    });
    fs.writeFileSync(descriptionFileName, preparedTemplate);
    const childProcess = exec(`${editor} ${descriptionFileName}`);
    childProcess.on("close", () => createPullRequest({owner, repo, branchName, descriptionFileName}));
};

const createPullRequest = ({owner, repo, branchName, descriptionFileName}) => {
    const {GITHUB_USERNAME, GITHUB_API_TOKEN} = process.env;
    if (!GITHUB_USERNAME || !GITHUB_API_TOKEN) {
        throw Error("missing github credentials");
    }
    const description = fs.readFileSync(descriptionFileName).toString();
    const descriptionLines = description.split(/\r?\n/);
    const title = descriptionLines[0];
    const body = descriptionLines.slice(1, descriptionLines.length - 1).join("\n");
    axios({
        method: "post",
        url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
        auth: {
            username: GITHUB_USERNAME,
            password: GITHUB_API_TOKEN,
        },
        data: {
            title: title,
            head: branchName,
            base: "master",
            body: body,
        },
    })
        .then(response => console.log(response.data.html_url))
        .catch(error => console.log(error.response))
        .finally(() => fs.unlink(descriptionFileName, () => {}));
};

const getRepoCoordinates = remote => {
    const [owner, repo] = remote
        .trim()
        .replace("https://github.com/", "")
        .replace("git@github.com:", "")
        .replace(".git", "")
        .split("/");
    return {owner, repo};
};

module.exports = {
    branchCommand,
    checkCommand,
    prCommand,
};
