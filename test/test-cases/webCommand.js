const fs = require("fs");
const {expect} = require("chai");

const {clearBeforeTests, prepareMockBrowser} = require("./utils/utils");
const {expectSuccess, expectError} = require("./utils/shorthands");
const {errorMessages} = require("../../src/utils/messages");
const {OPN_MOCK_LOGFILE} = require("./const");
const {updateInSession} = require("../../src/utils/storageHandler");

describe("webCommand", () => {
    before(() => {
        prepareMockBrowser();
    });

    beforeEach(() => {
        clearBeforeTests();
        fs.writeFileSync(OPN_MOCK_LOGFILE, "");
    });

    it("should fail for the 'board' target if there's no project set", done => {
        expectError("jiraf web board", errorMessages.noProjectSet, done);
    });

    it("should open the board if there's an active project", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("activeCardKey", "GRZ-1");
        expectSuccess("JIRAF_TESTING=1 jiraf web board", () => {
            const url = String(fs.readFileSync(OPN_MOCK_LOGFILE));
            expect(url.trim()).to.eq("http://127.0.0.1/secure/RapidBoard.jspa?rapidView=987");
            done();
        });
    });

    it("should fail for the 'backlog' target if there's no project set", done => {
        expectError("jiraf web backlog", errorMessages.noProjectSet, done);
    });

    it("should open the backlog if there's an active project", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("activeCardKey", "GRZ-1");
        expectSuccess("JIRAF_TESTING=1 jiraf web backlog", () => {
            const url = String(fs.readFileSync(OPN_MOCK_LOGFILE));
            expect(url.trim()).to.eq("http://127.0.0.1/secure/RapidBoard.jspa?rapidView=987&view=planning.nodetail");
            done();
        });
    });

    it("should fail for the 'card' target if there's no card set", done => {
        expectError("jiraf web card", errorMessages.noCardSet, done);
    });

    it("should open the card if there's an active card", done => {
        updateInSession("activeCardKey", "GRZ-1");
        expectSuccess("JIRAF_TESTING=1 jiraf web card", () => {
            const url = String(fs.readFileSync(OPN_MOCK_LOGFILE));
            expect(url.trim()).to.eq("http://127.0.0.1/browse/GRZ-1");
            done();
        });
    });

    it("should open the board if not target is specified", done => {
        updateInSession("activeProjectKey", "GRZ");
        updateInSession("activeCardKey", "GRZ-1");
        expectSuccess("JIRAF_TESTING=1 jiraf web", () => {
            const url = String(fs.readFileSync(OPN_MOCK_LOGFILE));
            expect(url.trim()).to.eq("http://127.0.0.1/secure/RapidBoard.jspa?rapidView=987");
            done();
        });
    });
});
