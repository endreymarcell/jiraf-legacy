const assert = require("assert");
const fs = require("fs");
const {exec} = require("child_process");

describe("Jiraf tests", () => {
    it("should be running", () => {
        assert.equal(1, 1);
    });

    it("should only run in Docker", () => {
        assert.ok(fs.existsSync("/.dockerenv"));
    });
});

describe("The jiraf command line tool", () => {
    it("should be responsive", done => {
        exec(`jiraf debug`, (error, stdout) => {
            assert.equal(error, null);
            assert.equal(stdout.trim(), "jiraf is responsive");
            done();
        });
    });
});
