const express = require("express");
const app = express();

app.get("/debug", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({mock: "GitHub"}));
});

app.listen(80, "127.0.0.2");
