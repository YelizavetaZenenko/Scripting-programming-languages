const express = require("express");
const router = express.Router();
const apiService = require("../services/apiService");

router.get("/", async (req, res) => {
    try {
        const data = await apiService.getHello();
        res.send(data);
    } catch (err) {
        res.status(500).send("Error connecting to API");
    }
});

module.exports = router;
