const {updateInSession, updateStatusFile} = require("../../../src/utils/storageHandler");
const {expectInSession, expectStatus} = require("../utils/shorthands");
const {clearBeforeTests} = require("../utils/utils");

describe("unsetCardCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should unset the card key", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectInSession("jiraf unset", {key: "activeCardKey", value: ""}, done);
    });

    it("should clear card details too when unsetting the card", done => {
        updateInSession("activeCardDetails", {foo: "bar"});
        expectInSession("jiraf unset", {key: "activeCardDetails", value: {}}, done);
    });

    it("should clear the status file when unsetting the card", done => {
        updateStatusFile("random content in the status file");
        expectStatus("jiraf unset", "", done);
    });
});
