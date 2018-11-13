const fs = require("fs");
const {expect} = require("chai");

const {expectOutput, expectSuccess} = require("./utils/shorthands");
const {JIRAF_CONFIG_FILE} = require("../../src/const");
const {infoMessages} = require("../../src/utils/messages");

describe("initCommand", () => {
    it("should create a config file if there isn't one", done => {
        if (fs.existsSync(JIRAF_CONFIG_FILE)) {
            fs.unlinkSync(JIRAF_CONFIG_FILE);
        }
        expectOutput("jiraf init", infoMessages.configCreated, () => {
            expect(fs.existsSync(JIRAF_CONFIG_FILE)).to.be.true;
            done();
        });
    });

    it("should not modify existing config files", done => {
        fs.writeFileSync(JIRAF_CONFIG_FILE, '{"spam": "eggs"}');
        expectSuccess("jiraf init", () => {
            const contents = String(fs.readFileSync(JIRAF_CONFIG_FILE));
            expect(contents).to.eq('{"spam": "eggs"}');
            done();
        });
    });
});
