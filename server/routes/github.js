import { Octokit } from '@octokit/rest'
var express = require('express');
var router = express.Router();

const octokit = new Octokit({auth: "7c9313ab5a83df19181fcd6717b23e1b779f594e"});

/* GET directory listings. */
router.get('/', async (req, res) => {
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
    
    const arr = [];

    const filteredResponse = response.data.tree.filter(
      (directory) =>
        directory.type.includes("tree") 
    ).map((page) => ({
      name: page.path
    }));

     //console.log(result)
    res.status(response.status).send({ directories: filteredResponse })
  } catch (error) {
    res.status(error.status).send({error})
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
    
    const arr = [];

    const filteredResponse = response.data.tree.filter(
      (directory) =>
        directory.type.includes("blob") 
    ).map((page) => ({
      name: page.path
    }));

     //console.log(result)
    res.status(response.status).send({ directories: filteredResponse })
  } catch (error) {
    res.status(error.status).send({error})
  }
});

router.get('/get-stream-files', async (req, res)  => {
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

    res.status(response.status).send({files: filteredResponse})
  } catch (error) {
    res.status(error.status).send({ error })
  }
})

router.get('/get-stream-files-content', async (req, res)  => {
  const { path } = req.query

  try {
    const response = await octokit.repos.getContent({
      owner: "brandonc118",
      repo: "StreamData",
      ref: "heads/main",
      path: `${path}`,
    });
    const buff = Buffer.from(response.data.content, 'base64')
    const text = buff.toString('ascii')

    res.set('Content-Type', 'text/yaml')
    res.status(response.status).send(text)

  } catch (error) {
    res.status(error.status).send({ error })
  }
})

module.exports = router;