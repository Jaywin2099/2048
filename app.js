const express = require('express');
const path = require('path');
var app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    console.log(`${req.ip} requested ${req.url}`);
    res.sendFile('./public/html/index.html', { root: path.join(__dirname) });
});

app.listen(3000, () => console.log('Serving 2048 to port 3000'));