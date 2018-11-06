const {errorMessages} = require("../../../src/utils/messages");
const {expectError, expectSuccess, expectInSession} = require("../utils/shorthands");
const {clearBeforeTests} = require("../utils/utils");
const {updateInSession} = require("../../../src/utils/storageHandler");

describe("refreshProjectCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no project set", done => {
        expectError("jiraf refreshproject", errorMessages.noProjectSet, done);
    });

    it("should throw an error if there's an invalid project key in the session", done => {
        updateInSession("activeProjectKey", "NOSUCHPROJECT");
        expectError(
            "jiraf refreshproject",
            errorMessages.cannotLoadBoard("NOSUCHPROJECT", "Request failed with status code 404"),
            done
        );
    });

    it("should succeed if there's a valid project key in the session", done => {
        updateInSession("activeProjectKey", "PROJ");
        expectSuccess("jiraf refreshproject", done);
    });

    it("should load the statuses for the project", done => {
        updateInSession("activeProjectKey", "PROJ");
        expectInSession(
            "jiraf refreshproject",
            {
                key: "statuses",
                value: ["To Do", "In Progress", "Done", "Won't Fix"],
            },
            done
        );
    });
});
