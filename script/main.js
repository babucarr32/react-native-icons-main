import path from "path";
import { execSync } from "node:child_process";
import fsPromise from "node:fs/promises";
import { icons } from "./icons.js";
import { convertSVGToMDX } from "./svg-to-mdx.js";
import { generateContent } from "./content-generator.js";
import simpleGit from "simple-git";

/**
 *
 * @param {string} folderName
 */
const handleGitPull = async (folderName) => {
  const git = simpleGit(
    path.join(process.cwd(), "icons", folderName),
    "master"
  );
  console.log(`Starting pull for ${folderName}...`);
  if ((await git.pull())?.summary.changes) {
    console.log(`Changes available for ${folderName}.`);
    return folderName;
  }
  console.log("pull done. \n");
};

const git = simpleGit();

try {
  const repos = [];

  // for (let i = 0; i < icons.length; i += 1) {
  //   const source = icons[i].source.url;
  //   const localName = icons[i].source.localName;

  //   /*
  //   First pull project, if it does not exist, then clone.
  //    */
  //   try {
  //     const repoName = await handleGitPull(localName);
  //     if (repoName) {
  //       repos.push(repoName);
  //     }
  //   } catch (error) {
  //     if (
  //       error.message ===
  //       "Cannot use simple-git on a directory that does not exist"
  //     ) {
  //       repos.push(localName);

  //       try {
  //         console.log(
  //           "Cloning",
  //           source,
  //           "to",
  //           `${path.join(process.cwd(), "icons", localName)}`
  //         );
  //         await git.clone(
  //           source,
  //           path.join(process.cwd(), path.join("icons", localName))
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  // }
  // console.log("Git task done... \n");

  // await convertSVGToMDX(repos);
  // await generateContent(repos);
  await fsPromise.rm(
    path.join(
      process.cwd(),
      `icons/`
    ),
    {
      recursive: true,
      force: true,
    }
  );
  console.log("Delete success...")
} catch (error) {
  console.error(error.message);
}
