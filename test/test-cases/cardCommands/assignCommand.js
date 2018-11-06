const fs = require("fs");
const {expect} = require("chai");

const {expectSuccess, expectInSession, expectError, expectStatus} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {updateInSession, updateInConfig} = require("../../../src/utils/storageHandler");
const {clearBeforeTests} = require("../utils/utils");
const {JIRA_MOCK_LOGFILE} = require("../../test-cases/const");

describe("assignCardCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
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

    it("should update the active card's details in the session", done => {
        updateInSession("activeCardKey", "ASSIGNSNOOPDOGG-123");
        expectInSession(
            "jiraf assign snoop.dogg",
            {
                key: "activeCardDetails",
                value: {
                    key: "ASSIGNSNOOPDOGG-123",
                    summary: "Snoop Dogg",
                    description: "Welcome to the World of the Plastic Beach",
                    status: "Done",
                    assignee: "snoop.dogg",
                    priority: "Prio3 - Medium",
                    estimate: 1,
                },
            },
            done
        );
    });

    it("should update the statusfile", done => {
        updateInSession("activeCardKey", "ASSIGNSNOOPDOGG-123");
        updateInConfig("statusTemplate", "{{key}} $$${{assignee}}$$$");
        expectStatus("jiraf assign snoop.dogg", "ASSIGNSNOOPDOGG-123 $$$snoop.dogg$$$", done);
    });
});
