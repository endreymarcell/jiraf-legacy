const {clearSession, updateInSession, updateInConfig} = require("../../../src/utils/storageHandler");
const {expectError, expectInSession, expectStatus} = require("../utils/shorthands");
const {resetConfig} = require("../utils/utils");

describe("setCard", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it("should throw an error when called without arguments", done => {
        expectError("jiraf set", "missing argument 'cardKey'", done);
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

    it("should load the card's details", done => {
        expectInSession(
            "jiraf set PROJ-123",
            {
                key: "activeCardDetails",
                value: {
                    key: "PROJ-123",
                    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    description:
                        " Integer purus mi, interdum eu imperdiet vitae, luctus eu nibh. Pellentesque at venenatis massa, quis ultrices tellus.",
                    status: "In Progress",
                    assignee: "marcell.endrey",
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
            expectStatus("jiraf set PROJ-123", "(PROJ-123) -->marcell.endrey", done);
        });

        it("should use the default status template if none is configured", done => {
            expectStatus(
                "jiraf set PROJ-123",
                "PROJ-123 [In Progress] Lorem ipsum dolor sit amet, consectetur adipiscing elit. (marcell.endrey)",
                done
            );
        });
    });
});
