const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {resetConfig} = require("../utils/utils");

describe("the PR command", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it.skip("should fail if there's no card set", done => {
        expectError("jiraf pr", errorMessages.noCardSet, done);
    });

    it.skip("should fail if the directory is not a git repository", done => {
        done();
    });

    it.skip("should fail if there's no origin set", done => {
        done();
    });

    it.skip("should open the editor with the correct PR description template", done => {
        done();
    });

    it.skip("should fail if the GitHub credentials are not set", done => {
        done();
    });

    it.skip("should POST to the correct endpoint", done => {
        done();
    });

    it.skip("should print the created PR's URL", done => {
        done();
    });
});
