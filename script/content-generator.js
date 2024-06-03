import fs from "node:fs";
import fsPromise from "node:fs/promises";
import path from "path";
import {
  generateOutputDirectory,
  handleMakeDir,
  handleWriteFile,
} from "./svg-to-mdx.js";
import { icons } from "./icons.js";

/**
 *
 * @param {string} text
 */
const generateTitleCase = (text) => {
  if (text)
    text = `all${text
      .replaceAll(".", " ")
      .replaceAll("-", " ")
      .split(" ")
      .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
      .join("")}`;
  return text;
};

/**
 *
 * @param {string} path
 */
const fsMakeDir = async (path, recursive = true) => {
  await fsPromise.mkdir(path, { recursive }, (err, path) => {
    if (err) throw err;
  });
};

let fileData = "";
/**
 *
 * @param {string} iconName
 * @returns {string}
 */
const getInitialData = (iconName) =>
  `export const ${generateTitleCase(iconName)} = [];`;

/**
 *
 * @param {string} typeName
 * @param {string} declaredTypes
 * @returns {string}
 */
const generateTypes = (typeName, declaredTypes) => {
  const generatedTypes = `type Icon = {
  ${declaredTypes}
};
export const ${generateTitleCase(typeName)}: Icon[];
`;
  return generatedTypes;
};

const handleReadFile = async (
  filePath,
  relativePath,
  outputFolderName,
  iconName
) => {
  if (filePath.endsWith(".mdx")) {
    const OUTPUT = path.join(outputFolderName, "index.js");
    try {
      fileData = await fsPromise.readFile(OUTPUT, {
        encoding: "utf-8",
      });
    } catch (error) {
      const initialData = getInitialData(iconName);
      await fsPromise.writeFile(OUTPUT, initialData);
    }

    const data = await fsPromise.readFile(filePath, { encoding: "utf-8" });
    let [metaData, rawData] = data.split("`");
    metaData = metaData
      .replace("<<path>>", path)
      .replace("<<date>>", String(Date()));
    metaData = metaData.split("---")[1].split("\n");

    let newMetaData = "";
    let declaredTypes = "";

    for (let i = 0; i < metaData.length; i++) {
      if (metaData[i]) {
        const [key, value] = metaData[i].split(":");
        newMetaData += `${key}: '${value?.trim()}',`;
        declaredTypes += `${key}: string;\n\t`;
      }
    }
    metaData = newMetaData;
    let replacedFileData = fileData?.replace(
      "];",
      `{_raw: \`${rawData}\`, ${newMetaData}},];`
    );
    declaredTypes += `_raw: string;`;
    return { OUTPUT, replacedFileData, declaredTypes };
  }
};

const handleReadDir = async (folderPath) => {
  try {
    const files = await fsPromise.readdir(path.resolve(folderPath), {
      recursive: true,
    });
    return { files, dir: path.resolve(folderPath) };
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {number} index
 */
const handleGenerateContent = async (index, _icons) => {
  try {
    const folderName = _icons[index].source.localName;
    const outputDir = path.join(process.cwd(), "_contents", folderName);

    try {
      await fsMakeDir(outputDir);
    } catch (err) { }

    const result = await handleReadDir(
      path.join(process.cwd(), `mdx/icons/${folderName}`)
    );
    const { files, dir: folderDir } = result;

    let tsDir;
    let generatedTypes;
    const iconName = _icons[index]?.name;
    fileData = getInitialData(iconName);

    console.log(`Generate: ${iconName} ${index + 1}/${_icons.length}`);

    for (let i = 0; i < files.length; i++) {
      const currentPath = path.join(folderDir, files[i]);
      const relativePath = path.join(files[i]);
      const fileToWrite = await handleReadFile(
        currentPath,
        relativePath.replace(".mdx", ".js"),
        outputDir,
        iconName
      );

      if (fileToWrite) {
        const {
          OUTPUT: dir,
          replacedFileData: data,
          declaredTypes,
        } = fileToWrite;
        tsDir = dir.replace(".js", ".d.ts");

        generatedTypes = generateTypes(iconName, declaredTypes);

        await fsPromise.writeFile(dir, data, (err) => {
          if (err) throw err;
        });
        await fsPromise.writeFile(tsDir, generatedTypes, (err) => {
          if (err) throw err;
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param {string[]} repos
 */
export const generateContent = async (repos) => {
  /*
    If repos are updated generate contents only for updated repos 
  */
  console.log("Generating contents...");
  if (repos.length) {
    const filteredRepos = icons.filter((icon) =>
      repos.includes(icon.source.localName)
    );
    for (let i = 0; i < filteredRepos.length; i++) {
      try {
        /*
        Delete folder before generating icons
        */
        await fsPromise.rm(
          path.join(
            process.cwd(),
            `_contents/${filteredRepos[i].source.localName}`
          ),
          {
            recursive: true,
            force: true,
          }
        );
        await handleGenerateContent(i, filteredRepos);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("\n");
  } else {
    console.log("Generate content: Everything up-to-date. \n")
  }
};
