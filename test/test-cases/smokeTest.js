const {expect} = require("chai");
const fs = require("fs");
const axios = require("axios");
const {expectOutput, expectError} = require("./utils/shorthands");

describe("Smoke tests", () => {
    describe("Jiraf tests", () => {
        it("should be running", () => {
            expect(true).to.be.true;
        });

        it("should only run in Docker", () => {
            expect(fs.existsSync("/.dockerenv")).to.be.true;
        });
    });

    describe("The jiraf command line tool", () => {
        it("should be responsive", done => {
            expectOutput("jiraf debug", "jiraf is responsive", done);
        });

        it("should not accept unknown commands", done => {
            expectError("jiraf whatever", "unkonwn command 'whatever'", done);
        });
    });

    // TODO skip until I manage to make these work on CircleCI
    describe.skip("The mock API", () => {
        describe("for JIRA", () => {
            it("should be available as jiraf-testing.atlassian.net", async () => {
                const response = await axios("http://jiraf-testing.atlassian.net/debug");
                expect(response.status).to.eq(200);
                expect(response.data).to.deep.eq({mock: "JIRA"});
            });
        });

        describe("for GitHub", () => {
            it("should be available as github.com", async () => {
                const response = await axios("http://github.com/debug");
                expect(response.status).to.eq(200);
                expect(response.data).to.deep.eq({mock: "GitHub"});
            });
        });
    });
});
