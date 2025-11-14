const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world from API!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
