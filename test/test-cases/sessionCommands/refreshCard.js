const {errorMessages} = require("../../../src/utils/messages");
const {expectError, expectSuccess, expectInSession, expectStatus} = require("../utils/shorthands");
const {clearBeforeTests} = require("../utils/utils");
const {updateInSession} = require("../../../src/utils/storageHandler");

describe("refreshCardCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf refresh", errorMessages.noCardSet, done);
    });

    it("should throw an error if there's an invalid card key in the session", done => {
        updateInSession("activeCardKey", "NOSUCHCARD-123");
        expectError("jiraf refresh", errorMessages.cannotLoadCard("Request failed with status code 404"), done);
    });

    it("should succeed if there's a valid card key in the session", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectSuccess("jiraf refresh", done);
    });

    it("should load the card's details", done => {
        updateInSession("activeCardKey", "GRZ-1");
        expectInSession(
            "jiraf refresh",
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

    it("should update the statusfile", done => {
        updateInSession("activeCardKey", "GRZ-1");
        expectStatus("jiraf refresh", "(GRZ-1)", done);
    });
});
