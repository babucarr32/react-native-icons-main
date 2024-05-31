import fs from "node:fs";
import fsPromise from "node:fs/promises";
import path from "path";
import {
  generateOutputDirectory,
  handleMakeDir,
  handleWriteFile,
} from "./svg-to-mdx.js";
import { icons } from "./icons.js";

let fileData = "";
const handleReadFile = async (
  filePath,
  relativePath,
  outputFolderName,
  extension,
  template
) => {
  if (filePath.endsWith(".mdx")) {
    const OUTPUT = path.join(outputFolderName, "index.js");
    try {
      fileData = await fsPromise.readFile(OUTPUT, {
        encoding: "utf-8",
      });
    } catch (error) {
      await fsPromise.writeFile(OUTPUT, `[];`);
    }

    const data = await fsPromise.readFile(filePath, { encoding: "utf-8" });
    let [metaData, rawData] = data.split("`");
    metaData = metaData
      .replace("<<path>>", path)
      .replace("<<date>>", String(Date()));
    metaData = metaData.split("---")[1].split("\n");
    let newMetaData = "";
    for (let i = 0; i < metaData.length; i++) {
      if (metaData[i]) {
        const [key, value] = metaData[i].split(":");
        newMetaData += `${key}: '${value?.trim()}',`;
      }
    }
    metaData = newMetaData;
    let fileDatas = fileData?.replace(
      "];",
      `{_raw: \`${rawData}\`, ${metaData}},];`
    );
    // handleWriteFile(OUTPUT, fileData);
    // fileData = "[];"
    return { OUTPUT, fileDatas };
  }
};

const handleReadDir = async (folderPath, outputFolderPath, extension) => {
  try {
    const files = await fsPromise.readdir(path.resolve(folderPath), {
      recursive: true,
    });
    return { files, dir: path.resolve(folderPath) };
  } catch (error) {
    console.error(error);
  }
};

for (let i = 0; i < icons.length; i++) {
  const folderName = icons[i].source.localName;
  const outPut = path.join("./_contents", folderName);

  try {
    await fsPromise.mkdir(outPut, (err, path) => {
      if (err) throw err;
    });
  } catch (err) { }

  const result = await handleReadDir(
    `./mdx/icons/${folderName}`,
    outPut,
    ".js"
  );
  const { files, dir } = result;

  // console.log({ files })
  fileData = "[];"
  for (let i = 0; i < files.length; i++) {
    const currentPath = path.join(dir, files[i]);
    const relativePath = path.join(files[i]);
    const fileToWrite = await handleReadFile(
      currentPath,
      relativePath.replace(".mdx", ".js"),
      outPut,
      ".js",
      "template"
    );

    const { OUTPUT, fileDatas } = fileToWrite;
    // console.log(fileToWrite)
    await fsPromise.writeFile(OUTPUT, fileDatas, (err) => {
      if (err) throw err;
    });
  }
}
