const {expectError, expectInSession} = require("../utils/shorthands");

describe("setProject", () => {
    it("should throw an error when called without arguments", done => {
        expectError("jiraf setproject", "missing argument 'projectKey'", done);
    });

    it("should store the project key in the session", done => {
        expectInSession("jiraf setproject PROJ", "activeProjectKey", "PROJ", done);
    });
});
