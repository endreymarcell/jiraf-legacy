const addJsonEndpoint = (app, url, data) => {
    app.get(url, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(data));
    });
};

module.exports = {
    addJsonEndpoint,
};
