const {clearSession} = require("../../src/utils/storageHandler");
const {resetConfig} = require("./utils/utils");

describe("the command executor logic", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it.skip("should open the board if there's no command specified", done => {
        done();
    });

    it.skip("should fail for an unknown command", done => {
        done();
    });

    it.skip("should run a command specified by a shortcut", done => {
        done();
    });

    it.skip("should run multiple command specified by a shortcut", done => {
        done();
    });

    it.skip("should substitute the argument when a shortcut specifies that", done => {
        done();
    });
});
