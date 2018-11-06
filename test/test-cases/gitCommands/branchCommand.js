const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {clearBeforeTests} = require("../utils/utils");

describe("creating a git branch", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it.skip("should fail if there's no card set", done => {
        expectError("jiraf branch", errorMessages.noCardSet, done);
    });

    it.skip("should create a proper branch name", done => {
        done();
    });
});
