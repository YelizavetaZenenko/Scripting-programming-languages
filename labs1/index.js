require('dotenv').config();
const express = require('express');
const app = express();

const PORT = 3000;

const MESSAGE = process.env.MESSAGE || "Hello World";

app.get('/', (req, res) => {
    res.send(MESSAGE);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
