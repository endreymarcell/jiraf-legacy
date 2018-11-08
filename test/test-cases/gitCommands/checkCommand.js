const {expectOutput, expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {clearBeforeTests} = require("../utils/utils");
const {updateInSession} = require("../../../src/utils/storageHandler");

describe("checkCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf check", errorMessages.noCardSet, done);
    });

    it("should return nothing if there's no open PR for the card", done => {
        updateInSession("activeCardKey", "NOPR-1");
        expectOutput("jiraf check", "", done);
    });

    it("should return the URL of the PR if there's one", done => {
        updateInSession("activeCardKey", "ONEPR-1");
        expectOutput("jiraf check", "https://github.com/endreymarca/jiraf/pull/100", done);
    });

    it("should return the URL of all the PRs associated with the card if there are several", done => {
        updateInSession("activeCardKey", "MOREPRS-1");
        const expectedOutput = [
            "https://github.com/endreymarca/jiraf/pull/100",
            "https://github.com/endreymarca/jiraf/pull/200",
            "https://github.com/endreymarca/jiraf/pull/300",
        ].join("\n");
        expectOutput("jiraf check", expectedOutput, done);
    });
});
