const express = require('express')
const port = 8000
const app = express()
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})
function onServerStart(callback) {
    if (callback) {
        console.log(`Server running at :  http://localhost:${port}/ `);
    }
}


onServerStart(app.listen(port));