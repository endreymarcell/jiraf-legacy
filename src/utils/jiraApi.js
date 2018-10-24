const axios = require("axios");
const {JIRA_RESTAPI_URL} = require("../const");
const {getFromConfig} = require("./storageHandler");

const {ATLASSIAN_USERNAME, ATLASSIAN_API_TOKEN} = process.env;
if (!ATLASSIAN_USERNAME || !ATLASSIAN_API_TOKEN) {
    throw Error("missing Atlassian credentials");
}

const makeRequest = (url, options) => {
    const JIRA_URL_BASE = getFromConfig("jira_url_base");
    // console.log(`${JIRA_URL_BASE}${JIRA_RESTAPI_URL}${url}`);
    const baseOptions = {
        url: `${JIRA_URL_BASE}${JIRA_RESTAPI_URL}${url}`,
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
    makeRequest(url, options);
};

const post = (url, data) => {
    const options = {
        method: "post",
        data: data,
    };
    makeRequest(url, options);
};

module.exports = {
    get,
    post,
    put,
};
