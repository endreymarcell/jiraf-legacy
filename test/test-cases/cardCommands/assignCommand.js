const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {resetConfig} = require("../utils/utils");

describe("assigning", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it.skip("should fail if there's no card set", done => {
        expectError("jiraf assign", errorMessages.noCardSet, done);
    });

    it.skip("should fail if the username is invalid", done => {
        done();
    });

    it.skip("should succeed if the provided username is valid", done => {
        done();
    });

    it.skip("should assign to the current user if there's no username passed", done => {
        done();
    });

    it.skip("should update the active card's details in the session", done => {
        done();
    });

    it.skip("should update the statusfile", done => {
        done();
    });
});
