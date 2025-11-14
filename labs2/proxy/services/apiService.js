const client = require("../client/axiosClient");

async function getHello() {
    const response = await client.get("/");
    return response.data;
}

module.exports = { getHello };
