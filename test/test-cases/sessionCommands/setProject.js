const assert = require("assert");
const {exec} = require("child_process");

const {JIRAF} = require("../../const");

describe("setProject", () => {
    it("should throw an error when called without arguments", done => {
        exec(`${JIRAF} setproject`, error => {
            assert.notEqual(error, null);
            done();
        });
    });
});
