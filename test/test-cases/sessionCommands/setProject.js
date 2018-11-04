const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError, expectInSession} = require("../utils/shorthands");
const {resetConfig} = require("../utils/utils");

describe("setProject", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it("should throw an error when called without arguments", done => {
        expectError("jiraf setproject", "missing argument 'projectKey'", done);
    });

    it.skip("should throw an error when called with a non-existent project key", done => {
        done();
    });

    it.skip("should succeed when called with a valid project key", done => {
        done();
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
