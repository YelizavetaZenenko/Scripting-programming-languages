const convict = require("convict");
require("dotenv").config();

const config = convict({
    apiUrl: {
        doc: "URL API",
        format: String,
        default: process.env.API_URL
    },
    port: {
        doc: "Port for proxy",
        format: "port",
        default: process.env.PROXY_PORT
    }
});

module.exports = config;
