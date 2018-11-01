const {updateInSession} = require("../../../src/utils/storageHandler");
const {clearSession} = require("../../../src/utils/storageHandler");
const {expectInSession} = require("../utils/shorthands");

describe("unsetProject", () => {
    beforeEach(() => {
        clearSession();
    });

    it("should unset the project", done => {
        updateInSession("activeProjectKey", "PROJ");
        expectInSession("jiraf unsetproject", {key: "activeProjectKey", value: ""}, done);
    });

    it("should clear statuses when unsetting the project", done => {
        updateInSession("statuses", ["foo", "bar", "baz"]);
        expectInSession("jiraf unsetproject", {key: "statuses", value: []}, done);
    });
});
