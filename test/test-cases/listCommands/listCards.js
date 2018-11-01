const {errorMessages} = require("../../../src/utils/messages");
const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError} = require("../utils/shorthands");

describe("listCards", () => {
    beforeEach(() => {
        clearSession();
    });

    it("should fail if there's no project set", done => {
        expectError("jiraf ls", errorMessages.noProjectSet, done);
    });
});
