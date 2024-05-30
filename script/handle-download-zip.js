import { handleDownload } from "./index.js";
import fs from "fs";
import path from "path";

const handleGetFolderName = (path) => path.split("/").pop();

// const handleCreateFile = (
//   decodedContent,
//   fileName,
//   folderZip: JSZip
// ) => {
//   const uint8ArrayContent = new Uint8Array(decodedContent.length);
//   for (let i = 0; i < decodedContent.length; i++) {
//     uint8ArrayContent[i] = decodedContent.charCodeAt(i);
//   }

//   (folderZip as JSZip).file(fileName, uint8ArrayContent);
// };

const handleCreateFilePath = (path) => {
  if (path.includes(".")) {
    const folder = path.split("/").slice(1, -1).join("/");
    return folder;
  } else {
    return path;
  }
};

const handleMainDownload = async (path) => {
  const result = await fetch(`http://localhost:5000`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ path }),
  });
  return await result.json();
};

const handleDownloadZip = async (filePath, progressCallback) => {
  let processedCount = 0;
  let totalCount = 0;
  // const zip = new JSZip();

  const recurse = async (myPath) => {
    // const result = await handleMainDownload(myPath);
    const result = await handleMainDownload(filePath);

    const fileContent = result.data;
    if (Array.isArray(fileContent)) {
      totalCount += fileContent.length;
      await Promise.all(
        fileContent.map(async (data) => {
          if (data.type === "dir") {
            // await recurse(data.path);
            console.log({ dir: data.path });
          } else {
            console.log({ file: data.path });
            // await recurse(data.path);
          }
        })
      );
    } else {
      processedCount++;
      const filePath = handleCreateFilePath(fileContent.path);

      // Decode the content
      const decodedContent = atob(fileContent.content);

      // Create the full path for the file, including the directory
      const fullFilePath = path.join(filePath, fileContent.name);

      // Ensure the directory exists
      const directoryPath = path.dirname(fullFilePath);
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync("directoryPath", { recursive: true });
      }

      // Write the file to the filesystem
      fs.writeFileSync("directoryPath", decodedContent, "utf-8");

      console.log(`File saved to ${fullFilePath}`);

      // const folder = zip.folder(filePath);
      // const decodedContent = atob(fileContent.content);
      // handleCreateFile(decodedContent, fileContent.name, folder);

      const progress = (processedCount / totalCount) * 100;
      // progressCallback(progress);
    }
  };

  await recurse(filePath);

  // const zipData = await zip.generateAsync({ type: "blob" });

  // progressCallback(100);

  const folderName = handleGetFolderName(filePath);

  // return { zipData, folderName };
};

// const handleDownload = (zipData, folderName) => {
//   const downloadLink = document.createElement("a");
//   downloadLink.href = URL.createObjectURL(zipData);
//   downloadLink.download = `${folderName}.zip`;
//   downloadLink.click();
// };

handleDownloadZip("components/clocks");
// export { handleDownload as download, handleDownloadZip };
