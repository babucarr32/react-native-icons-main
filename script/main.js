import path from "path";
import { execSync } from "node:child_process";
import { icons } from "./icons.js";

try {
  for (let i = 0; i < icons.length; i += 1) {
    const source = icons[i].source.url;
    try {
      execSync(`git clone ${source}`, {
        stdio: [0, 1, 2],
        cwd: "../icons",
      });
    } catch (error) {}
  }
} catch (error) {
  console.log(error);
}
