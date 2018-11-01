const fs = require("fs");
const {JIRAF_SESSION_FILE} = require("../../../src/const");
const {expect} = require("chai");
const {exec} = require("child_process");

const expectOutput = (command, output, done) => {
    exec(command, (error, stdout, stderr) => {
        expect(error).to.be.null;
        expect(stdout.trim()).to.eq(output);
        expect(stderr.trim()).to.eq("");
        done();
    });
};

const expectError = (command, errorMessage, done) => {
    exec(command, (error, stdout, stderr) => {
        expect(error).to.not.be.null;
        expect(stdout.trim()).to.eq("");
        expect(stderr.trim()).to.eq(`jiraf ERROR: ${errorMessage}`);
        done();
    });
};

const expectInSession = (command, {key, value}, done) => {
    exec(command, () => {
        const contents = JSON.parse(fs.readFileSync(JIRAF_SESSION_FILE));
        expect(contents[key]).to.deep.eq(value);
        done();
    });
};

module.exports = {
    expectOutput,
    expectError,
    expectInSession,
};
