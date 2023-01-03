const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./public/index.js');
var fs = require('fs');

const port = 8000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

var orderTable = [];

function onServerStart(callback) {
    console.log(`Server running at :  http://localhost:${port}/ `);
};

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/next', (req, res) => {
    let order = req.body;
    index.addPrice(order);
    orderTable.push(order)
    console.log('recorded order #' + order.order);
    res.sendFile(__dirname + '/public/index.html', {
        headers: {
            'Content-Type': 'text/html'
        }
    });
});

app.get('/check', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/preview.html'));
});

app.get('/orders', (req, res) => {
    res.send(orderTable);
});

app.get('/done', (req, res) => {
    text = index.textModel(orderTable);
    fs.writeFile('order.txt', text.toString(), function (err) {
        if (err) return console.log(err);
        console.log('order.txt created');
    });
    res.end();
    // un fichier "order.txt" sera créé dans le dossier racine
});

onServerStart(app.listen(port));