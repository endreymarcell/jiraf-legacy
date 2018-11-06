const {updateInSession, updateInConfig} = require("../../../src/utils/storageHandler");
const {expectError, expectInSession, expectStatus} = require("../utils/shorthands");
const {clearBeforeTests} = require("../utils/utils");

describe("setCard", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should throw an error when called without arguments", done => {
        expectError("jiraf set", "missing argument 'cardKey'", done);
    });

    it.skip("should throw an error when called with a non-existent card key", done => {
        done();
    });

    it.skip("should succeed when called with a valid card key", done => {
        done();
    });

    it.skip("should succeed when called a string that begins with a valid card key", done => {
        done();
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

    it("should load the card's details", done => {
        expectInSession(
            "jiraf set GRZ-1",
            {
                key: "activeCardDetails",
                value: {
                    key: "GRZ-1",
                    summary: "The future is coming on",
                    description: "I ain't happy, I'm feeling glad, I got sunshine in a bag",
                    status: "To Do",
                    assignee: "clint.eastwood",
                    priority: "Prio3 - Medium",
                    estimate: 3,
                },
            },
            done
        );
    });

    describe("statusfile update", () => {
        it("should use the statusTemplate config if set", done => {
            updateInConfig("statusTemplate", "({{key}}) -->{{assignee}}");
            expectStatus("jiraf set PROJ-123", "(GRZ-1) -->clint.eastwood", done);
        });

        it("should use the default status template if none is configured", done => {
            expectStatus("jiraf set GRZ-1", "GRZ-1 [To Do] The future is coming on (clint.eastwood)", done);
        });
    });

    it("should load the project's statuses when given a full key", done => {
        expectInSession(
            "jiraf set PROJ-123",
            {
                key: "statuses",
                value: ["To Do", "In Progress", "Done", "Won't Fix"],
            },
            done
        );
    });
});
