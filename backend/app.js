const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const scores = require("./routes/api/scores");

const app = express();

// bodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./configuration/config").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/scores", scores);

// process.env.PORT for heroku
const isDeveloping = process.env.NODE_ENV !== "production";
const port = isDeveloping ? 3001 : process.env.PORT;

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

app.listen(port, error => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(
    "==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.",
    port,
    port
  );
});

module.exports = app;
