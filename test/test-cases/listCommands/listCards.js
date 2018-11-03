const {errorMessages} = require("../../../src/utils/messages");
const {clearSession} = require("../../../src/utils/storageHandler");
const {expectError, expectOutput} = require("../utils/shorthands");
const {updateInSession} = require("../../../src/utils/storageHandler");

describe("listCards", () => {
    beforeEach(() => {
        clearSession();
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
                "GRZ-3 [Done]        Melancholy Hill (submarine)\n" +
                "GRZ-4 [Won't Fix]   Humility (george.benson)",
            done
        );
    });

    it("should list cards for a specific status", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("statuses", ["To Do", "In Progress", "Done", "Won't Fix"]);
        expectOutput("jiraf ls -s done", "GRZ-3 [Done]        Melancholy Hill (submarine)", done);
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
            "GRZ-1 [To Do]       The future is coming on (clint.eastwood)",
            done
        );
    });
});
