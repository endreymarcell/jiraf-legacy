const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {resetConfig} = require("../utils/utils");

describe("details", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf details", errorMessages.noCardSet, done);
    });

    it.skip("should use the default template if there's no config and no argument", done => {
        done();
    });

    it.skip("should use the config template if there's one", done => {
        done();
    });

    it.skip("should use the argument template if it's passed", done => {
        done();
    });

    it.skip("should use the argument template even if there's a config as well", done => {
        done();
    });
});
