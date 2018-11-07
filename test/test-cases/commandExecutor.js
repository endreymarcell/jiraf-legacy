const fs = require("fs");
const {expect} = require("chai");

const {clearBeforeTests, prepareMockBrowser} = require("./utils/utils");
const {expectSuccess, expectError, expectOutput, expectInSession} = require("./utils/shorthands");
const {errorMessages} = require("../../src/utils/messages");
const {updateInConfig, updateInSession} = require("../../src/utils/storageHandler");
const {JIRAF_SESSION_FILE} = require("../../src/const");
const {OPN_MOCK_LOGFILE} = require("./const");

describe("commandExecutor", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should open the board if there's no command specified", done => {
        prepareMockBrowser();
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("activeCardKey", "GRZ-1");
        expectSuccess("JIRAF_TESTING=1 jiraf", () => {
            const url = String(fs.readFileSync(OPN_MOCK_LOGFILE));
            expect(url.trim()).to.eq("http://127.0.0.1/secure/RapidBoard.jspa?rapidView=987");
            done();
        });
    });

    it("should fail for an unknown command", done => {
        expectError("jiraf jiraf", errorMessages.unknownCommand("jiraf"), done);
    });

    it("should run a command specified by a shortcut", done => {
        updateInConfig("shortcuts", {test: ["debug"]});
        expectOutput("jiraf test", "jiraf is responsive", done);
    });

    it("should run multiple command specified by a shortcut", done => {
        updateInConfig("shortcuts", {test: ["debug", "set GRZ-1"]});
        expectOutput("jiraf test", "jiraf is responsive", () => {
            const session = JSON.parse(fs.readFileSync(JIRAF_SESSION_FILE));
            expect(session.activeCardDetails).to.deep.eq({
                key: "GRZ-1",
                summary: "The future is coming on",
                description: "I ain't happy, I'm feeling glad, I got sunshine in a bag",
                status: "To Do",
                assignee: "clint.eastwood",
                priority: "Prio3 - Medium",
                estimate: 3,
            });
            done();
        });
    });

    it("should substitute the argument when a shortcut specifies that", done => {
        updateInConfig("shortcuts", {test: ["set {}"]});
        expectInSession("jiraf test GRZ-4", {key: "activeCardKey", value: "GRZ-4"}, done);
    });
});
