import fs from "node:fs";
import fsPromise from "node:fs/promises";
import path from "path";
import {
  generateOutputDirectory,
  handleMakeDir,
  handleWriteFile,
} from "./svg-to-mdx.js";

let fileData;
const handleReadFile = (
  filePath,
  relativePath,
  outputFolderName,
  extension = ".js",
  template
) => {
  handleMakeDir(relativePath, outputFolderName).then(async () => {
    if (filePath.endsWith(".mdx")) {
      const outputDir = generateOutputDirectory(
        outputFolderName,
        relativePath,
        extension
      );

      fileData = await fsPromise.readFile("../_contents/index2.js", {
        encoding: "utf-8",
      });

      // OPT for cases where meta data is not available
      const data = await fsPromise.readFile(filePath, { encoding: "utf-8" });
      let [metaData, rawData] = data.split("`");

      metaData = metaData
        .replace("<<path>>", path)
        .replace("<<date>>", String(Date()));

      metaData = metaData.split("---")[1].split("\n");
      const arrayMetaData = [];
      for (let i = 0; i < metaData.length; i++) {
        if (metaData[i]) {
          const [key, value] = metaData[i].split(":");
          arrayMetaData.push({ [key]: value.trim() });
        }
      }
      metaData = arrayMetaData;

      fileData = fileData.replace(
        "];",
        `{_raw: \`${rawData}\`, _metaData: ${JSON.stringify(metaData)}},];`
      );
      handleWriteFile("../_contents/index2.js", fileData);
    }
  });
};

const handleReadDir = (
  folderPath = "../mdx/icons/LUC",
  outputFolderPath = "OUTPUT"
) => {
  fs.readdir(path.resolve(folderPath), { recursive: true }, (err, files) => {
    if (err) {
      return console.error(err);
    }

    files.map((file) => {
      const currentPath = path.join(folderPath, file);
      const relativePath = path.join(file);
      handleReadFile(
        currentPath,
        relativePath.replace(".mdx", ".js"),
        (outputFolderPath = "../_contents"),
        "extension",
        "template"
      );
    });
  });
};

handleReadDir();
