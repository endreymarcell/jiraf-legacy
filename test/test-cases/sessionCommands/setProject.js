const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError, expectInSession} = require("../utils/shorthands");
const {updateInSession} = require("../../../src/utils/storageHandler");

describe("setProject", () => {
    beforeEach(() => {
        clearSession();
    });

    it("should throw an error when called without arguments", done => {
        expectError("jiraf setproject", "missing argument 'projectKey'", done);
    });

    it("should store the project key in the session", done => {
        expectInSession("jiraf setproject PROJ", {key: "activeProjectKey", value: "PROJ"}, done);
    });

    it("should clear statuses when setting a new project", done => {
        updateInSession("statuses", ["foo", "bar", "baz"]);
        expectInSession("jiraf setproject PROJ", {key: "statuses", value: []}, done);
    });
});
