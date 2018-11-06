const {expectError, expectInSession, expectSuccess} = require("../utils/shorthands");
const {clearBeforeTests} = require("../utils/utils");
const {errorMessages} = require("../../../src/utils/messages");

describe("setProjectCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should throw an error when called without arguments", done => {
        expectError("jiraf setproject", "missing argument 'projectKey'", done);
    });

    it("should throw an error when called with a non-existent project key", done => {
        expectError(
            "jiraf setproject NOSUCHPROJECT",
            errorMessages.cannotLoadBoard("NOSUCHPROJECT", "Request failed with status code 404"),
            done
        );
    });

    it("should succeed when called with a valid project key", done => {
        expectSuccess("jiraf setproject PROJ", done);
    });

    it("should store the project key in the session", done => {
        expectInSession("jiraf setproject PROJ", {key: "activeProjectKey", value: "PROJ"}, done);
    });

    it("should load the statuses for the project", done => {
        expectInSession(
            "jiraf setproject PROJ",
            {
                key: "statuses",
                value: ["To Do", "In Progress", "Done", "Won't Fix"],
            },
            done
        );
    });
});
