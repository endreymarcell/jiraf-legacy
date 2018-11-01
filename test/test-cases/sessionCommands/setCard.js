const {clearSession, updateInSession} = require("../../../src/utils/storageHandler");
const {expectError, expectInSession} = require("../utils/shorthands");

describe("setCard", () => {
    beforeEach(() => {
        clearSession();
    });

    it("should throw an error when called without arguments", done => {
        expectError("jiraf set", "missing argument 'cardKey'", done);
    });

    it("should store the card key in the session", done => {
        expectInSession("jiraf set PROJ-123", {key: "activeCardKey", value: "PROJ-123"}, done);
    });

    it("should store the project too when given a full key", done => {
        expectInSession("jiraf set PROJ-123", {key: "activeProjectKey", value: "PROJ"}, done);
    });

    it("should should read the project from the session when only given a partial key", done => {
        updateInSession("activeProjectKey", "PROJ");
        expectInSession("jiraf set 123", {key: "activeCardKey", value: "PROJ-123"}, done);
    });

    it("should fail when only given a partial key if there's no project set", done => {
        expectError("jiraf set 123", "no project set, provide a full card key", done);
    });
});
