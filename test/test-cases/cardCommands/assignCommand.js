const fs = require("fs");
const {expect} = require("chai");

const {clearSession} = require("../../../src/utils/storageHandler");
const {expectSuccess, expectInSession, expectError} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {updateInSession} = require("../../../src/utils/storageHandler");
const {resetConfig} = require("../utils/utils");
const {JIRA_MOCK_LOGFILE} = require("../../test-cases/const");

describe("assigning", () => {
    beforeEach(() => {
        clearSession();
        resetConfig();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf assign", errorMessages.noCardSet, done);
    });

    it("should fail if the username is invalid", done => {
        updateInSession("activeCardKey", "NOASSIGN-123");
        expectError(
            "jiraf assign honey.badger",
            errorMessages.cannotAssignCard("NOASSIGN-123", "Request failed with status code 400"),
            done
        );
    });

    it("should succeed if the provided username is valid", done => {
        updateInSession("activeCardKey", "ASSIGN-123");
        expectSuccess("jiraf assign gamma.delta", done);
    });

    it("should send the full username if there's no @ in it", done => {
        updateInSession("activeCardKey", "ASSIGNWRITE-123");
        fs.writeFileSync(JIRA_MOCK_LOGFILE, "");
        expectSuccess("jiraf assign gamma.delta", () => {
            const logfileContents = String(fs.readFileSync(JIRA_MOCK_LOGFILE));
            expect(logfileContents.trim()).to.eq("gamma.delta");
            fs.unlinkSync(JIRA_MOCK_LOGFILE);
            done();
        });
    });

    it("should assign to the current user if there's no username passed", done => {
        updateInSession("activeCardKey", "ASSIGNWRITE-123");
        fs.writeFileSync(JIRA_MOCK_LOGFILE, "");
        expectSuccess("jiraf assign", () => {
            const logfileContents = String(fs.readFileSync(JIRA_MOCK_LOGFILE));
            expect(logfileContents.trim()).to.eq("mock_atlassian_username");
            fs.unlinkSync(JIRA_MOCK_LOGFILE);
            done();
        });
    });

    it("should remove the part after @ from the username", done => {
        updateInSession("activeCardKey", "ASSIGNWRITE-123");
        fs.writeFileSync(JIRA_MOCK_LOGFILE, "");
        expectSuccess("ATLASSIAN_USERNAME=foo.bar@baz.com jiraf assign", () => {
            const logfileContents = String(fs.readFileSync(JIRA_MOCK_LOGFILE));
            expect(logfileContents.trim()).to.eq("foo.bar");
            fs.unlinkSync(JIRA_MOCK_LOGFILE);
            done();
        });
    });

    it.skip("should update the active card's details in the session", done => {
        updateInSession("activeCardKey", "ASSIGNBIMMBUMM-123");
        fs.writeFileSync(JIRA_MOCK_LOGFILE, "");
        expectInSession(
            "jiraf assign bumm.bumm",
            {
                key: "activeCardDetails",
                value: {
                    key: "GRZ-1",
                    summary: "The future is coming on",
                    description: "I ain't happy, I'm feeling glad, I got sunshine in a bag",
                    status: "To Do",
                    assignee: "bimm.bumm",
                    priority: "Prio3 - Medium",
                    estimate: 3,
                },
            },
            done
        );
    });

    it.skip("should update the statusfile", done => {
        done();
    });
});
