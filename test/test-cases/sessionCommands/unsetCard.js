const {updateInSession} = require("../../../src/utils/storageHandler");
const {clearSession} = require("../../../src/utils/storageHandler");
const {expectInSession} = require("../utils/shorthands");

describe("unsetCard", () => {
    beforeEach(() => {
        clearSession();
    });

    it("should unset the card key", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectInSession("jiraf unset", {key: "activeCardKey", value: ""}, done);
    });

    it("should clear card details too when unsetting the card", done => {
        updateInSession("activeCardDetails", {foo: "bar"});
        expectInSession("jiraf unset", {key: "activeCardDetails", value: {}}, done);
    });
});
