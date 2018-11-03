const {DEFAULT_STATUS_TEMPLATE, DEFAULT_DETAILS_TEMPLATE} = require("../const");
const {readStatuses, readFromConfig, readActiveCardDetails} = require("./storageHandler");
const {errorMessages} = require("./messages");

const rightPad = (str, fullLength) => {
    let paddedStr = str;
    while (paddedStr.length < fullLength) {
        paddedStr += " ";
    }
    return paddedStr;
};

const getShortUsername = () => {
    const {ATLASSIAN_USERNAME} = process.env;
    return ATLASSIAN_USERNAME.substring(0, ATLASSIAN_USERNAME.indexOf("@"));
};

const getStatusForSlug = slug => {
    const statuses = readStatuses();
    for (const status of statuses) {
        if (getSlugForStatus(status).startsWith(slug)) {
            return status;
        }
    }
    throw Error(`unknown status slug ${slug}`);
};

const getSlugForStatus = status => {
    // lowercase, alphanumeric
    return status.replace(/\W/g, "").toLowerCase();
};

const interpolate = (template, dictionary) => {
    let result = template;
    for (const key in dictionary) {
        result = result.replace(new RegExp(`{{\\s?${key}\\s?}}`, "g"), String(dictionary[key]));
    }
    return result;
};

const parseCardResponse = response => {
    return {
        key: response.key,
        summary: response.fields.summary,
        status: response.fields.status.name,
        assignee: response.fields.assignee ? response.fields.assignee.name : null,
        description: response.fields.description,
        priority: response.fields.priority.name,
        estimate: response.fields.customfield_10005,
    };
};

const print = console.log;

const warn = message => {
    console.warn(`jiraf WARNING: ${message}`);
};

const die = message => {
    console.error(`jiraf ERROR: ${message}`);
    process.exitCode = 1;
};

const readAtlassianCredentials = () => {
    const {ATLASSIAN_USERNAME, ATLASSIAN_API_TOKEN} = process.env;
    if (!ATLASSIAN_USERNAME || !ATLASSIAN_API_TOKEN) {
        throw Error(errorMessages.noAtlassianCredentials);
    }
    return {ATLASSIAN_USERNAME, ATLASSIAN_API_TOKEN};
};

const readGithubCredentials = () => {
    const {GITHUB_USERNAME, GITHUB_API_TOKEN} = process.env;
    if (!GITHUB_USERNAME || !GITHUB_API_TOKEN) {
        throw Error(errorMessages.noGithubCredentials);
    }
    return {GITHUB_USERNAME, GITHUB_API_TOKEN};
};

const generateStatus = () => {
    return generateSummary(null, "statusTemplate", DEFAULT_STATUS_TEMPLATE);
};

const generateDetails = template => {
    return generateSummary(template, "detailsTemplate", DEFAULT_DETAILS_TEMPLATE);
};

const generateSummary = (template, configTemplateName, defaultTemplate) => {
    let templateToUse;
    if (template) {
        templateToUse = template;
    } else {
        const templateFromConfig = readFromConfig(configTemplateName);
        if (templateFromConfig) {
            templateToUse = templateFromConfig;
        } else {
            templateToUse = defaultTemplate;
        }
    }
    return interpolate(templateToUse, readActiveCardDetails());
};

module.exports = {
    rightPad,
    getShortUsername,
    getStatusForSlug,
    getSlugForStatus,
    interpolate,
    parseCardResponse,
    print,
    warn,
    die,
    readAtlassianCredentials,
    readGithubCredentials,
    generateStatus,
    generateDetails,
};
