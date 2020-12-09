var cors = require('cors');
var express = require('express');
// bodyParser = require('body-parser');

var status = require('./routes/status');
var github = require('./routes/github');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/status', status);
app.use('/github', github);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

module.exports = app;
