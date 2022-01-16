const express = require('express');
const path = require('path');
var app = express();

const PORT=3000;

app.use(express.static('public'));

app.get('/:subdir', (req, res) => {
    console.log(`${req.ip} requested ${req.url}`);
    res.sendFile('./public/html/index.html', { root: path.join(__dirname) });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));