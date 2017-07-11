const express = require("express");
const path = require("path");
const app = express();

// routes matching paths to files in the build folder first.
app.use(express.static(path.join(__dirname, "build")));

// all unmatched paths get sent index.html.
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000);
