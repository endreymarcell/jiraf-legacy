const axios = require("axios");
const {readFromConfig} = require("./storageHandler");

const {ATLASSIAN_USERNAME, ATLASSIAN_API_TOKEN} = process.env;
if (!ATLASSIAN_USERNAME || !ATLASSIAN_API_TOKEN) {
    throw Error("missing Atlassian credentials");
}

const makeRequest = (url, options) => {
    const JIRA_URL_BASE = readFromConfig("jiraUrlBase");
    const baseOptions = {
        url: `${JIRA_URL_BASE}${url}`,
        method: "get",
        auth: {
            username: ATLASSIAN_USERNAME,
            password: ATLASSIAN_API_TOKEN,
        },
    };
    return axios({...baseOptions, ...options});
};

const get = url => {
    return makeRequest(url);
};

const put = (url, data) => {
    const options = {
        method: "put",
        data: data,
    };
    return makeRequest(url, options);
};

const post = (url, data) => {
    const options = {
        method: "post",
        data: data,
    };
    return makeRequest(url, options);
};

module.exports = {
    get,
    post,
    put,
};
