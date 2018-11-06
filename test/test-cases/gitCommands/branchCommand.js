const {exec} = require("child_process");

const {updateInSession} = require("../../../src/utils/storageHandler");
const {expectError, expectOutput} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {clearBeforeTests} = require("../utils/utils");

describe("creating a git branch", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf branch", errorMessages.noCardSet, done);
    });

    it("should fail if no branch name is specified", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectError("jiraf branch", errorMessages.missingArgument("branchname"), done);
    });

    it("should fail if git fails", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectError(
            "jiraf branch newbranch",
            errorMessages.cannotCreateBranch(
                "Command failed: git checkout -b PROJ-123-newbranch. fatal: Not a git repository (or any of the parent directories): .git. "
            ),
            done
        );
    });

    it("should create a proper branch name", done => {
        updateInSession("activeCardKey", "PROJ-123");
        exec(
            `git init &&
            git config --global user.email email &&
            git config --global user.name name &&
            git commit --allow-empty -m jiraf &&
            jiraf branch brunch
            `,
            () => {
                expectOutput("git rev-parse --abbrev-ref HEAD", "PROJ-123-brunch", done);
            }
        );
    });
});
