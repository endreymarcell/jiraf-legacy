const crypto = require("crypto");
const {execFileSync} = require("child_process");
const {expect} = require("chai");

const {updateInConfig} = require("../../src/utils/storageHandler");
const {resetConfig} = require("../test-cases/utils/utils");

describe("GitHub integration", () => {
    const hash = crypto.randomBytes(6).toString("hex");

    before(function() {
        this.timeout(10000);
        console.log("[setup]");
        resetConfig();
        updateInConfig("editor", "echo");
        execFileSync("./test/integration/scripts/setup.sh");
    });

    it("should go through the happy path of creating a branch and pull request", function() {
        console.log("[test]");
        this.timeout(10000);
        const output = String(execFileSync("./test/integration/scripts/test.sh", [hash]));
        expect(output.indexOf("https://github.com/endreymarcell/jiraf-integration-test/pull/")).to.not.eq(-1);
    });

    after(function() {
        console.log("[teardown]");
        this.timeout(10000);
        execFileSync("./test/integration/scripts/teardown.sh");
    });
});
