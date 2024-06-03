import fs from "node:fs";
import fsPromise from "node:fs/promises";
import path from "path";
import { icons } from "./icons.js";

import { optimize } from "svgo";

/**
 *
 * @param {string} svgString
 * @returns {string}
 */
const optimizeSvg = (svgString) => {
  const result = optimize(svgString, {
    js2svg: { indent: 2, pretty: true },
    plugins: [
      {
        name: "convertStyleToAttrs",
      },
      {
        name: "removeDimensions",
      },
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            convertColors: {
              currentColor: true,
            },
          },
        },
      },
    ],
  });

  return result.data;
};

/**
 *
 * @param {string} path
 * @param {string} data
 * @param {string | undefined} template
 */
export const handleWriteFile = async (path, data, template, folderName) => {
  const folderPath = path.split("/").slice(0, -1).join("/");
  const fileName = path.split("/").pop().split(".")[0];
  const extensionName = path.split("/").pop().split(".")[1];

  const modifiedData = template
    ? template

      .replace("<<children>>", data?.replace(/\s+/g, " ").trim())
      .replace("<<path>>", path)
      .replace("<<folderName>>", folderName)
      .replace("<<fileName>>", fileName)
      .replace("<<date>>", String(Date()))
      .replace("<<extensionName>>", extensionName)
    : data?.replace(/\s+/g, " ").trim();

  try {
    await fsPromise.writeFile(path, modifiedData);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {string} dir
 * @param {string} filePath
 * @param {string} extension
 * @param {".ext" | string} currentExt
 * @returns {string}
 */
export const generateOutputDirectory = (
  dir,
  filePath,
  extension,
  currentExt = ".svg"
) => {
  const splitFilePath = filePath
    .replace(currentExt, `.${extension}`)
    .split("/")
    .join("/");
  const outputDir = path.join(dir, splitFilePath);
  return outputDir;
};

/**
 *
 * @param {string} path
 * @returns {string | undefined}
 */
export const isDirectory = (path) => {
  const fileExtensionRegex = /\.[a-z0-9]+$/i;
  if (!fileExtensionRegex.test(path)) {
    return path;
  }
};

/**
 *
 * @param {string} folderPath
 * @param {string} outputFolderName
 * @returns { string }
 */
export const handleMakeDir = async (folderPath, outputFolderName) => {
  const createdDir = isDirectory(folderPath);
  const directory = createdDir
    ? path.join(outputFolderName, createdDir)
    : outputFolderName;

  await fsPromise.mkdir(directory, { recursive: true }, (err, path) => {
    if (err) throw err;
  });

  return directory;
};

/**
 *
 * @param {string} filePath
 * @param {string} relativePath
 * @param {string} outputFolderName
 * @param {string | boolean}  extension
 * @param {string} template
 */
export const handleReadFile = async (
  filePath,
  relativePath,
  outputFolderName,
  extension,
  template,
  folderName
) => {
  await handleMakeDir(relativePath, outputFolderName);
  if (filePath.endsWith(".svg")) {
    const outputDir = generateOutputDirectory(
      outputFolderName,
      relativePath,
      extension
    );

    try {
      const data = await fsPromise.readFile(filePath, { encoding: "utf-8" });
      await handleWriteFile(outputDir, optimizeSvg(data), template, folderName);
    } catch (error) {
      console.error(error);
    }
  }
};

/**
 *
 * @param {string} folderPath
 * @param {string} outputFolderPath
 * @param {string} extension
 * @param {string | boolean} template
 */
export const convertFolder = async (
  folderPath,
  outputFolderPath,
  extension,
  template = false
) => {
  const folderName = folderPath.split("/icons/")[1].split("/")[0];
  try {
    const files = await fsPromise.readdir(folderPath, { recursive: true });

    for (let i = 0; i < files.length; i++) {
      const currentPath = path.join(folderPath, files[i]);
      const relativePath = path.join(files[i]);
      await handleReadFile(
        currentPath,
        relativePath,
        outputFolderPath,
        extension,
        template,
        folderName
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const template = `---
name: <<fileName>>
folderName: <<folderName>>
---
\`<<children>>\``;

/**
 *
 * @param {string[]} icon
 * @param {number} index
 */
const convertSVGToMDXHandler = async (icon, index) => {
  for (let ii = 0; ii < icon.length; ii++) {
    const filePath = icon[ii].files.split("*.svg")[0];
    await convertFolder(
      path.join(process.cwd(), filePath),
      path.join(process.cwd(), `mdx/icons/${icons[index].source.localName}`),
      "mdx",
      template
    );
  }
};

/**
 *
 * @param {string[]} repos
 */
export const convertSVGToMDX = async (repos) => {
  console.log("Converting SVG's to MDX...");

  /*
    Regenerate only SVG's for only repos that are updated. 
  */
  if (repos.length) {
    const filteredRepos = icons.filter((icon) =>
      repos.includes(icon.source.localName)
    );
    for (let i = 0; i < filteredRepos.length; i++) {
      const currentIcon = filteredRepos[i].contents;
      console.log(`Convert: ${filteredRepos[i].name}`);
      await convertSVGToMDXHandler(currentIcon, i);
    }
    console.log("\n");
  } else {
    console.log("Convert SVG to MDX: Everything up-to-date. \n");
  }
};
