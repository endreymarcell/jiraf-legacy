const {errorMessages} = require("../../../src/utils/messages");
const {expectError, expectOutput} = require("../utils/shorthands");
const {updateInSession} = require("../../../src/utils/storageHandler");
const {clearBeforeTests} = require("../utils/utils");

describe("listCardsCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no project set", done => {
        expectError("jiraf ls", errorMessages.noProjectSet, done);
    });

    it("should list the cards on the board in the correct order", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("statuses", ["To Do", "In Progress", "Done", "Won't Fix"]);
        expectOutput(
            "jiraf ls",
            "GRZ-1 [To Do]       The future is coming on (clint.eastwood)\n" +
                "GRZ-2 [In Progress] 19-2000 (monkey.jungle)\n" +
                "GRZ-3 [Done]        Melancholy Hill (clint.eastwood)\n" +
                "GRZ-4 [Done]        Sorcererz (hold.on)\n" +
                "GRZ-5 [Won't Fix]   Humility (unassigned)",
            done
        );
    });

    it("should list cards for a specific status", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("statuses", ["To Do", "In Progress", "Done", "Won't Fix"]);
        expectOutput(
            "jiraf ls -s done",
            "GRZ-3 [Done]        Melancholy Hill (clint.eastwood)\n" + "GRZ-4 [Done]        Sorcererz (hold.on)",
            done
        );
    });

    it("should fail for unknown status slugs", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("statuses", ["To Do", "In Progress", "Done", "Won't Fix"]);
        expectError(
            "jiraf ls -s plastic",
            errorMessages.unknownStatusSlug("plastic", ["todo", "inprogress", "done", "wontfix"]),
            done
        );
    });

    it("should list cards for a specific assignee", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("statuses", ["To Do", "In Progress", "Done", "Won't Fix"]);
        expectOutput(
            "jiraf ls -a clint.eastwood",
            "GRZ-1 [To Do]       The future is coming on (clint.eastwood)\n" +
                "GRZ-3 [Done]        Melancholy Hill (clint.eastwood)",
            done
        );
    });

    it("should list the cards assigned to the current user when an empty assignee flag is passed", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("statuses", ["To Do", "In Progress", "Done", "Won't Fix"]);
        expectOutput(
            "ATLASSIAN_USERNAME=monkey.jungle jiraf ls -a",
            "GRZ-2 [In Progress] 19-2000 (monkey.jungle)",
            done
        );
    });

    it("should list unassigned cards when passing 'unassigned' as the assignee name", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("statuses", ["To Do", "In Progress", "Done", "Won't Fix"]);
        expectOutput("jiraf ls -a unassigned", "GRZ-5 [Won't Fix]   Humility (unassigned)", done);
    });

    it("should list cards filtered by status and assignee at the same time", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("statuses", ["To Do", "In Progress", "Done", "Won't Fix"]);
        expectOutput(
            "jiraf ls -a clint.eastwood -s done",
            "GRZ-3 [Done]        Melancholy Hill (clint.eastwood)",
            done
        );
    });
});
