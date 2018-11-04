const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {resetConfig} = require("../utils/utils");

describe("checking for open Pull Requests", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it.skip("should fail if there's no card set", done => {
        expectError("jiraf check", errorMessages.noCardSet, done);
    });

    it.skip("should return nothing if there's no open PR for the card", done => {
        done();
    });

    it.skip("should return the URL of the PR if there's one", done => {
        done();
    });

    it.skip("should return the URL of all the PRs associated with the card if there are several", done => {
        done();
    });
});
