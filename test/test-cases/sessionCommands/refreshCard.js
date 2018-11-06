const {errorMessages} = require("../../../src/utils/messages");
const {expectError} = require("../utils/shorthands");
const {clearBeforeTests} = require("../utils/utils");

describe("refreshCardCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf refresh", errorMessages.noCardSet, done);
    });

    it.skip("should throw an error if there's an invalid card key in the session", done => {
        done();
    });

    it.skip("should succeed if there's a valid card key in the session", done => {
        done();
    });

    it.skip("should load the card's details", done => {
        done();
    });

    it.skip("should update the statusfile", done => {
        done();
    });
});
