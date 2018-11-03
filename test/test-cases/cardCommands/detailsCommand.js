const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");

describe("details", () => {
    beforeEach(() => {
        clearSession();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf details", errorMessages.noCardSet, done);
    });
});
