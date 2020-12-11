import { Octokit } from '@octokit/rest';
import { response } from 'express';
var express = require('express');
var router = express.Router();
const yaml = require('js-yaml');

const octokit = new Octokit({ auth: "327684fa2665faca9b7df9d6d6fb85166689c6b2" });

/* GET directory listings. */
router.get('/get-directories', async (req, res) => {
  const { branch } = req.query

  console.log(branch)

  try {
    const reference = await octokit.git.getRef({
      owner: "brandonc118",
      repo: "StreamData",
      ref: `heads/${branch}`
    });

    const branchSha = reference.data.object.sha;

    const response = await octokit.git.getTree({
      owner: "brandonc118",
      repo: "StreamData",
      tree_sha: branchSha,
      recursive: true,
    });

    const filteredResponse = response.data.tree.filter(
      (directory) =>
        directory.type.includes("tree")
    ).map((page) => (page.path));

    //console.log(result)
    res.status(response.status).send(filteredResponse)
  } catch (error) {
    res.status(error.status).send({ error })
  }
});

router.get('/get-streams', async (req, res) => {
  try {
    const reference = await octokit.git.getRef({
      owner: "brandonc118",
      repo: "StreamData",
      ref: `heads/main`
    });

    const branchSha = reference.data.object.sha;

    const response = await octokit.git.getTree({
      owner: "brandonc118",
      repo: "StreamData",
      tree_sha: branchSha,
      recursive: true,
    });

    const filteredResponse = response.data.tree.filter(
      (directory) =>
        directory.type.includes("blob")
    ).map((page) => ({
      name: page.path
    }));

    //console.log(result)
    res.status(response.status).send({ directories: filteredResponse })
  } catch (error) {
    res.status(error.status).send({ error })
  }
});

router.get('/get-stream-files', async (req, res) => {
  const { path } = req.query

  try {
    const response = await octokit.repos.getContent({
      owner: "brandonc118",
      repo: "StreamData",
      ref: "heads/main",
      path: `${path}`,
    });

    const filteredResponse = response.data
      .filter((stream) => stream.name.includes(".yaml"))
      .map((page) => ({
        name: page.name.replace('.yaml', ''),
        path: page.path.replace(`${path}/`, ''),
        type: page.type,
      }));

    console.log(filteredResponse)

    res.status(response.status).send(filteredResponse)
  } catch (error) {
    res.status(error.status).send({ error })
  }
})

router.get('/get-stream-files-content', async (req, res) => {
  const { path, branch } = req.query

  try {
    const response = await octokit.repos.getContent({
      owner: "brandonc118",
      repo: "StreamData",
      ref: `heads/${branch}`,
      path: `${path}`,
    });
    const buff = Buffer.from(response.data.content, 'base64')
    const text = buff.toString('ascii')

    //  const doc = yaml.safeLoad(text);
    res.set('Content-Type', 'text/plain')
    res.status(response.status).send(text)
  } catch (error) {
    res.status(error.status).send({ error })
  }
})

router.get('/get-branches', async (req, res) => {
  try {
    const branches = await octokit.repos.listBranches({
      owner: "brandonc118",
      repo: "StreamData",
    });

    const filteredResponse = branches.data.map((page) => (
      page.name
    ));
    console.log(filteredResponse)
    res.set(branches.status).send(filteredResponse)
  } catch (error) {
    res.status(error.status).send({ error })
  }

})

router.post('/test-commit', async (req, res) => {
  const { branch } = req.query

  console.log(branch)
  try {
    //Get Current Commit
    const repoResponse = await octokit.repos.get({ owner: "brandonc118", repo: "StreamData" })
    const base = repoResponse.data.default_branch
    const latestCommitResponse = await octokit.repos.listCommits({
      owner: "brandonc118",
      repo: "StreamData",
      sha: base,
      per_page: 1
    })

    let latestCommitSha = latestCommitResponse.data[0].sha
    const treeSha = latestCommitResponse.data[0].commit.tree.sha
    console.log(latestCommitSha)

    //Create Changes
    const treeResponse = await octokit.git.createTree({
      owner: "brandonc118",
      repo: "StreamData",
      base_tree: treeSha,
      tree: Object.keys(req.body).map(path => {
        const mode = "100644"
        return {
          path,
          mode,
          type: "tree",
          content: req.body[path]
        }
      })
    })

    const newTreeSha = treeResponse.data.sha
    //Create New Commit
    const commitResponse = await octokit.git.createCommit({
      owner: "brandonc118",
      repo: "StreamData",
      message: "test commit2",
      tree: newTreeSha,
      parents: [latestCommitSha]
    })
    const newCommitSha = commitResponse.data.sha
    //Update Ref
    const updatedRef = await octokit.git.updateRef({
      owner: "brandonc118",
      repo: "StreamData",
      sha: newCommitSha,
      ref: `heads/${branch}`,
      force: true
    })

    // const updatedRef = await octokit.git.createRef({
    //   owner: "brandonc118",
    //   repo: "StreamData",
    //   sha: newCommitSha,
    //   ref: `refs/heads/test`,
    //   force: true
    // })
    res.set(updatedRef.status).send("Ok")
  } catch (error) {
    res.status(error.status).send({ error })
  }


})

module.exports = router;