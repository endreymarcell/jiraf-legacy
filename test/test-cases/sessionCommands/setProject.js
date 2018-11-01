const assert = require("assert");
const {exec} = require("child_process");

describe("setProject", () => {
    it("should throw an error when called without arguments", done => {
        exec(`jiraf setproject`, error => {
            assert.notEqual(error, null);
            done();
        });
    });
});
