const {updateInSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {clearBeforeTests} = require("../utils/utils");

describe("prCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf pr", errorMessages.noCardSet, done);
    });

    it("should fail if the directory is not a git repository", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectError(
            "rm -rf .git && jiraf pr",
            "Command failed: git rev-parse --abbrev-ref HEAD\nfatal: Not a git repository (or any of the parent directories): .git",
            done
        );
    });
});
