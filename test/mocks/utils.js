const addJsonGetEndpoint = (app, url, data) => {
    app.get(url, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(data));
    });
};

const addJsonPutEndpoint = (app, url, status) => {
    app.put(url, (req, res) => {
        res.sendStatus(status);
    });
};

const addJsonPostEndpoint = (app, url, status) => {
    app.post(url, (req, res) => {
        res.sendStatus(status);
    });
};

module.exports = {
    addJsonGetEndpoint,
    addJsonPutEndpoint,
    addJsonPostEndpoint,
};
