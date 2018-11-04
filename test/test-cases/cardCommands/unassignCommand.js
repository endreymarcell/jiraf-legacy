const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {resetConfig} = require("../utils/utils");

describe("unassigning", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf unassign", errorMessages.noCardSet, done);
    });

    it.skip("should succeed if there's an active card", done => {
        done();
    });

    it.skip("should update the active card's details in the session", done => {
        done();
    });

    it.skip("should update the statusfile", done => {
        done();
    });
});
