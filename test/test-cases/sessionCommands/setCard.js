const {updateInConfig} = require("../../../src/utils/storageHandler");
const {expectError, expectInSession, expectStatus, expectSuccess} = require("../utils/shorthands");
const {clearBeforeTests} = require("../utils/utils");
const {errorMessages} = require("../../../src/utils/messages");

describe("setCardCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should throw an error when called without arguments", done => {
        expectError("jiraf set", "missing argument 'cardKey'", done);
    });

    it("should throw an error when called with a non-existent card key", done => {
        expectError(
            "jiraf set NOSUCHCARD-123",
            errorMessages.cannotLoadCard("Request failed with status code 404"),
            done
        );
    });

    it("should succeed when called with a valid card key", done => {
        expectSuccess("jiraf set PROJ-123", done);
    });

    it("should succeed when called a string that begins with a valid card key", done => {
        expectSuccess("jiraf set 'PROJ-123 and lots of more content here'", done);
    });

    it("should store the card key in the session", done => {
        expectInSession("jiraf set PROJ-123", {key: "activeCardKey", value: "PROJ-123"}, done);
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
            expectStatus("jiraf set GRZ-1", "(GRZ-1)", done);
        });
    });
});
