var express = require('express');



const app = express();
const port = 3000

var status = require('./routes/status')
var github = require('./routes/github')

app.use('/status', status)
app.use('/github', github)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
