const {expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {clearBeforeTests} = require("../utils/utils");
const {updateInSession, updateInConfig} = require("../../../src/utils/storageHandler");
const {expectSuccess, expectInSession, expectStatus} = require("../utils/shorthands");

describe("unassigning", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf unassign", errorMessages.noCardSet, done);
    });

    it("should succeed if there's an active card", done => {
        updateInSession("activeCardKey", "ASSIGN-123");
        expectSuccess("jiraf unassign", done);
    });

    it("should update the active card's details in the session", done => {
        updateInSession("activeCardKey", "UNASSIGN-123");
        updateInSession("activeCardDetails", {
            key: "UNASSIGN-123",
            assignee: "some.body",
        });
        expectInSession(
            "jiraf unassign",
            {
                key: "activeCardDetails",
                value: {
                    key: "UNASSIGN-123",
                    assignee: "unassigned",
                    estimate: 1,
                    summary: "Assigned to no one",
                    description: "All the lonely people - where do they all belong?",
                    priority: "Prio3 - Medium",
                    status: "Done",
                },
            },
            done
        );
    });

    it("should update the statusfile", done => {
        updateInSession("activeCardKey", "UNASSIGN-123");
        updateInSession("activeCardDetails", {
            key: "UNASSIGN-123",
            assignee: "some.body",
        });
        updateInConfig("statusTemplate", "{{key}} $$${{assignee}}$$$");
        expectStatus("jiraf unassign", "UNASSIGN-123 $$$unassigned$$$", done);
    });
});
