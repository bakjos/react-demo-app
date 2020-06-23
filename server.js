const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());

app.get("/api/questions", (req, res) => {
  res.json({
    questions: [
      {
        id: "q1",
        text: "This is the first question",
        subtitle: "This is the subtitle",
        answers: [
          { id: 1, text: "Option 1" },
          { id: 2, text: "Option 2" },
          { id: 3, text: "Option 3" },
        ],
      },
      {
        id: "q2",
        text: "This is the second question",
        subtitle: "This is other subtitle",
        answers: [
          { id: 1, text: "Answer 1" },
          { id: 2, text: "Anwer 2" },
          { id: 3, text: "Answer 3" },
        ],
      },
      {
        id: "q3",
        text: "This is the third question",
        subtitle: "This is another subtitle",
        answers: [
          { id: 1, text: "Option 1" },
          { id: 2, text: "Option 3" },
        ],
      },
    ],
  });
  res.end();
});

app.post("/api/answers", (req, res) => {
  console.log("Request", req.body);
  let r = Math.random();
  if (r < 0.4) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
  res.end();
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
