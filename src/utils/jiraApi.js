const axios = require("axios");
const {JIRA_RESTAPI_URL, JIRAF_CONFIG_FILE, JIRAF_SESSION_FILE, STATUSES} = require("../const");
const {getFromConfig} = require("./storageHandler");

const {ATLASSIAN_USERNAME, ATLASSIAN_API_TOKEN} = process.env;
if (!ATLASSIAN_USERNAME || !ATLASSIAN_API_TOKEN) {
    console.error("missing credentials");
    process.exit(1);
}

const get = url => {
    const JIRA_URL_BASE = getFromConfig("jira_url_base");
    return axios({
        url: `${JIRA_URL_BASE}${JIRA_RESTAPI_URL}${url}`,
        auth: {
            username: ATLASSIAN_USERNAME,
            password: ATLASSIAN_API_TOKEN,
        },
    });
};

const put = (url, data) => {
    const JIRA_URL_BASE = getFromConfig("jira_url_base");
    return axios({
        method: "put",
        url: `${JIRA_URL_BASE}${JIRA_RESTAPI_URL}${url}`,
        data: data,
        auth: {
            username: ATLASSIAN_USERNAME,
            password: ATLASSIAN_API_TOKEN,
        },
    });
};

module.exports = {
    get,
    put,
};
