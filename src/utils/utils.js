const {readStatuses} = require("./storageHandler");

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
    throw Error("unknown status slug");
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

module.exports = {
    rightPad,
    getShortUsername,
    getStatusForSlug,
    getSlugForStatus,
    interpolate,
    parseCardResponse,
};
