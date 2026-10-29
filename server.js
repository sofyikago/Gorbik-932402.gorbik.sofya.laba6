const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

app.use(function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

app.get("/", function (req, res) {
    res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(PUBLIC_DIR, "about.html"));
});

app.get("/api/greet/:name", function (req, res) {
    const name = req.params.name.trim();
    if (name === "" || !/^[\p{L}\d]+$/u.test(name)) {
        res.status(400).json({ error: "Invalid name" });
        return;
    }

    const lang = req.query.lang === "ru" ? "ru" : "en";
    const message = lang === "ru" ? "Привет, " + name + "!" : "Hello, " + name + "!";

    res.json({
        message: message,
        timestamp: new Date().toISOString(),
        lang: lang
    });
});

app.use(express.static(PUBLIC_DIR));

app.use(function (req, res) {
    res.status(404).json({ error: "Not found" });
});

app.listen(PORT, function () {
    console.log("Server started on http://localhost:" + PORT);
});
