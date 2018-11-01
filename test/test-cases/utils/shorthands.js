const {expect} = require("chai");
const {exec} = require("child_process");

const expectOutput = (command, output, done) => {
    exec(command, (error, stdout, stderr) => {
        expect(error).to.be.null;
        expect(stdout.trim()).to.eq(output);
        expect(stderr.trim()).to.eq("");
        done();
    });
}

const expectError= (command, errorMessage, done) => {
    exec(command, (error, stdout, stderr) => {
        expect(error).to.not.be.null;
        expect(stdout.trim()).to.eq("");
        expect(stderr.trim()).to.eq(`jiraf ERROR: ${errorMessage}`);
        done();
    });
}

module.exports = {
    expectOutput,
    expectError,
}

