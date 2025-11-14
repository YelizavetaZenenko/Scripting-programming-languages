const express = require("express");
const app = express();
const config = require("./config/config");
const routes = require("./routes");

app.use("/", routes);

const PORT = config.get("port");
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
