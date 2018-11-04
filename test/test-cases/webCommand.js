const {clearSession} = require("../../src/utils/storageHandler");
const {resetConfig} = require("./utils/utils");

describe("the web command", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it.skip("should fail for the 'board' target if there's no project set", done => {
        done();
    });

    it.skip("should open the board if there's an active project", done => {
        done();
    });

    it.skip("should fail for the 'backlog' target if there's no project set", done => {
        done();
    });

    it.skip("should open the backlog if there's an active project", done => {
        done();
    });

    it.skip("should fail for the 'card' target if there's no card set", done => {
        done();
    });

    it.skip("should open the card if there's an active card", done => {
        done();
    });

    it.skip("should open the board if not target is specified", done => {
        done();
    });
});
