const {clearBeforeTests} = require("./utils/utils");
const {expectError} = require("./utils/shorthands");
const {errorMessages} = require("../../src/utils/messages");

describe("webCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail for the 'board' target if there's no project set", done => {
        expectError("jiraf web board", errorMessages.noProjectSet, done);
    });

    it.skip("should open the board if there's an active project", done => {
        done();
    });

    it("should fail for the 'backlog' target if there's no project set", done => {
        expectError("jiraf web backlog", errorMessages.noProjectSet, done);
    });

    it.skip("should open the backlog if there's an active project", done => {
        done();
    });

    it("should fail for the 'card' target if there's no card set", done => {
        expectError("jiraf web card", errorMessages.noCardSet, done);
    });

    it.skip("should open the card if there's an active card", done => {
        done();
    });

    it.skip("should open the board if not target is specified", done => {
        done();
    });
});
