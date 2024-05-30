import { Octokit } from "octokit";

const octokit = new Octokit({});

export const handleDownload = async (filePath) => {
  console.log({ filePath });
  // const result = await octokit.request(
  //   "GET /repos/{owner}/{repo}/contents/{path}",
  //   {
  //     owner: "shadcngeek",
  //     repo: "shadcngeeks",
  //     path: filePath,
  //     headers: {
  //       "X-GitHub-Api-Version": "2022-11-28",
  //     },
  //   }
  // );

  // console.log({ result });

  return "";
};
