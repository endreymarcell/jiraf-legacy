const {errorMessages} = require("../../../src/utils/messages");
const {expectError} = require("../utils/shorthands");
const {clearBeforeTests} = require("../utils/utils");

describe("refreshProject", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no project set", done => {
        expectError("jiraf refreshproject", errorMessages.noProjectSet, done);
    });

    it.skip("should throw an error if there's an invalid project key in the session", done => {
        done();
    });

    it.skip("should succeed if there's a valid project key in the session", done => {
        done();
    });

    it.skip("should load the statuses for the project", done => {
        done();
    });
});
