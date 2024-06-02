import path from "path";
import { execSync } from "node:child_process";
import { icons } from "./icons.js";
import { convertSVGToMDX } from "./svg-to-mdx.js"
import { generateContent } from "./content-generator.js"
import simpleGit from "simple-git";

const git = simpleGit()

try {
  for (let i = 0; i < icons.length; i += 1) {
    const source = icons[i].source.url;
    const localName = icons[i].source.localName;
    try {
      console.log("Cloning", source, "to", `${path.join(process.cwd(), "icons", localName)}`)
      await git.clone(source, path.join(process.cwd(), path.join(process.cwd(), "icons", localName)))
    } catch (error) {
      console.log(error)
    }
  }
  await convertSVGToMDX()
  await generateContent()
} catch (error) {
  console.log(error);
}
