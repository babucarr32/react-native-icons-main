const { execSync } = require("node:child_process");

function test() {
  execSync("next dev");
  console.log("Server has started");
}
test();
