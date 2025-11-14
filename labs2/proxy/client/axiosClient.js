const axios = require("axios");
const config = require("../config/config");

const client = axios.create({
    baseURL: config.get("apiUrl")
});

module.exports = client;
