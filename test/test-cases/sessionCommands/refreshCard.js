const {errorMessages} = require("../../../src/utils/messages");
const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");

describe("refreshCard", () => {
    beforeEach(() => {
        clearSession();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf refresh", errorMessages.noCardSet, done);
    });
});
