const rightPad = (str, fullLength) => {
    let paddedStr = str;
    while (paddedStr.length < fullLength) {
        paddedStr += " ";
    }
    return paddedStr;
};

const getShortUsername = () => {
    const {ATLASSIAN_USERNAME} = process.env;
    return ATLASSIAN_USERNAME.substring(0, ATLASSIAN_USERNAME.indexOf("@"))
}

module.exports = {
    rightPad,
    getShortUsername,
};
