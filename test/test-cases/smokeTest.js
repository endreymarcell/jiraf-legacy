const assert = require("assert");
const fs = require("fs");
const axios = require("axios");
const {exec} = require("child_process");

describe("Smoke tests", () => {
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

    describe("The mock API", () => {
        describe("for JIRA", () => {
            it("should be available as jiraf-testing.atlassian.net", async () => {
                const response = await axios("http://jiraf-testing.atlassian.net");
                assert.equal(response.status, 200);
            });
        });

        describe("for GitHub", () => {
            it("should be available as github.com", async () => {
                const response = await axios("http://github.com");
                assert.equal(response.status, 200);
            });
        });
    });
});
