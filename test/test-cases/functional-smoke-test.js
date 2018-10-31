const assert = require("assert");
const fs = require("fs");
const {exec} = require("child_process");

const {JIRAF} = require("../const");

describe("Functional tests", () => {
    it("should be running", () => {
        assert.equal(1, 1);
    });

    it("should only run in Docker", () => {
        assert.ok(fs.existsSync("/.dockerenv"));
    });

    it("should be responsive", () => {
        exec(`${JIRAF} debug`, (error, stdout) => {
            assert.equal(stdout.trim(), "jiraf is responsive");
        });
    });
});
