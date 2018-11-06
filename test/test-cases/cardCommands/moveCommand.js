const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {clearBeforeTests} = require("../utils/utils");

describe("moving the card", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf move", errorMessages.noCardSet, done);
    });

    it.skip("should fail if there's no new status passed", done => {
        done();
    });

    it.skip("should fail if the new status is invalid", done => {
        done();
    });

    it.skip("should succeed for a valid status", done => {
        done();
    });

    it.skip("should update the active card's details in the session", done => {
        done();
    });

    it.skip("should update the statusfile", done => {
        done();
    });
});
