const {updateInSession} = require("../../../src/utils/storageHandler");
const {clearSession} = require("../../../src/utils/storageHandler");
const {expectInSession} = require("../utils/shorthands");
const {resetConfig} = require("../utils/utils");

describe("unsetCard", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it("should unset the card key", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectInSession("jiraf unset", {key: "activeCardKey", value: ""}, done);
    });

    it("should clear card details too when unsetting the card", done => {
        updateInSession("activeCardDetails", {foo: "bar"});
        expectInSession("jiraf unset", {key: "activeCardDetails", value: {}}, done);
    });

    it.skip("should clear the status file when unsetting the card", done => {
        done();
    });
});
