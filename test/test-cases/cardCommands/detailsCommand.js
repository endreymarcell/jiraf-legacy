const fs = require("fs");
const {expect} = require("chai");

const {updateInSession, updateInConfig} = require("../../../src/utils/storageHandler");
const {expectError, expectOutput} = require("../utils/shorthands");
const {errorMessages} = require("../../../src/utils/messages");
const {clearBeforeTests} = require("../utils/utils");
const {JIRAF_CONFIG_FILE} = require("../../../src/const");

describe("detailsCommand", () => {
    beforeEach(() => {
        clearBeforeTests();
    });

    it("should fail if there's no card set", done => {
        expectError("jiraf details", errorMessages.noCardSet, done);
    });

    it("should use the default template if there's no config and no argument", done => {
        updateInSession("activeCardKey", "PROJ-123");
        updateInSession("activeCardDetails", {
            key: "GRZ-1",
            summary: "The future is coming on",
            description: "I ain't happy, I'm feeling glad, I got sunshine in a bag",
            status: "To Do",
            assignee: "clint.eastwood",
            priority: "Prio3 - Medium",
            estimate: 3,
        });

        const config = JSON.parse(fs.readFileSync(JIRAF_CONFIG_FILE));
        expect(config.detailsTemplate).to.be.undefined;

        expectOutput("jiraf details", "GRZ-1 [To Do] The future is coming on (clint.eastwood)", done);
    });

    it("should use the config template if there's one", done => {
        updateInSession("activeCardKey", "PROJ-123");
        updateInSession("activeCardDetails", {
            key: "GRZ-1",
            summary: "The future is coming on",
            description: "I ain't happy, I'm feeling glad, I got sunshine in a bag",
            status: "To Do",
            assignee: "clint.eastwood",
            priority: "Prio3 - Medium",
            estimate: 3,
        });
        updateInConfig("detailsTemplate", "-{{estimate}}- {{status}} __{{summary}}__ <{{key}}>");

        expectOutput("jiraf details", "-3- To Do __The future is coming on__ <GRZ-1>", done);
    });

    it("should use the argument template if it's passed", done => {
        updateInSession("activeCardKey", "PROJ-123");
        updateInSession("activeCardDetails", {
            key: "GRZ-1",
            summary: "The future is coming on",
            description: "I ain't happy, I'm feeling glad, I got sunshine in a bag",
            status: "To Do",
            assignee: "clint.eastwood",
            priority: "Prio3 - Medium",
            estimate: 3,
        });

        expectOutput(
            "jiraf details '{{summary}} by {{assignee}} is estimated at {{estimate}} points [{{status}}]'",
            "The future is coming on by clint.eastwood is estimated at 3 points [To Do]",
            done
        );
    });

    it("should use the argument template if it's passed", done => {
        updateInSession("activeCardKey", "PROJ-123");
        updateInSession("activeCardDetails", {
            key: "GRZ-1",
            summary: "The future is coming on",
            description: "I ain't happy, I'm feeling glad, I got sunshine in a bag",
            status: "To Do",
            assignee: "clint.eastwood",
            priority: "Prio3 - Medium",
            estimate: 3,
        });
        updateInConfig("detailsTemplate", "-{{estimate}}- {{status}} __{{summary}}__ <{{key}}>");

        expectOutput(
            "jiraf details '{{summary}} by {{assignee}} is estimated at {{estimate}} points [{{status}}]'",
            "The future is coming on by clint.eastwood is estimated at 3 points [To Do]",
            done
        );
    });
});
