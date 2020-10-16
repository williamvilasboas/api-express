const express = require('express');

const app = express();

const { PORT } = process.env;

app.get('/', async (req, res) => {
    return res.send({
        status: "ok"
    });
});

module.exports = () => {
    return new Promise((resolve, reject) => {
        return app.listen(PORT, () => {
            return resolve(`Listening on port: ${PORT}`);
        }).on("error", (err) => {
            return reject(err);
        });
    });
};