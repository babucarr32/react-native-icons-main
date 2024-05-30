import express from "express";
import { Octokit } from "octokit";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

const octokit = new Octokit({});

// create application/json parser
var jsonParser = bodyParser.json();

// create application/json parser
var jsonParser = bodyParser.json();

app.post("/", jsonParser, async (req, res) => {
  const bodyContents = req.body;
  const { path } = bodyContents;

  const result = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "shadcngeek",
      repo: "shadcngeeks",
      path: path,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
