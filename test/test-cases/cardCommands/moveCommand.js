const {expectError, expectSuccess, expectInSession, expectStatus} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {clearBeforeTests} = require("../utils/utils");
const {updateInSession, updateInConfig} = require("../../../src/utils/storageHandler");

describe("moveCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf move", errorMessages.noCardSet, done);
    });

    it("should fail if there's no new status passed", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectError("jiraf move", errorMessages.missingArgument("status"), done);
    });

    it("should fail if the new status is invalid", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectError(
            "jiraf move home",
            errorMessages.cannotMoveCard(
                "home",
                errorMessages.unknownStatus("home", "todo, inprogress, done, wontfix")
            ),
            done
        );
    });

    it("should succeed for a valid status", done => {
        updateInSession("activeCardKey", "PROJ-123");
        expectSuccess("jiraf move done", done);
    });

    it("should update the active card's details in the session", done => {
        updateInSession("activeCardKey", "GRZ-1");
        updateInSession("activeCardDetails", {status: "done"});
        expectInSession(
            "jiraf move todo",
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
        updateInSession("activeCardDetails", {status: "done"});
        updateInConfig("statusTemplate", "{{key}} > {{status}}");
        expectStatus("jiraf move todo", "GRZ-1 > To Do", done);
    });
});
