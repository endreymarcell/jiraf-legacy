const {updateInSession} = require("../../../src/utils/storageHandler");
const {clearSession} = require("../../../src/utils/storageHandler");
const {expectInSession} = require("../utils/shorthands");
const {resetConfig} = require("../utils/utils");

describe("unsetProject", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
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
