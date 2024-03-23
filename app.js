const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const port = 3000;


//MiddleWare
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

//Route to form
app.get("/", (req, res) => {
  res.render("index.ejs");
});


//Route to fetch the data and redirect to our form
app.post("/saveSurvey", (req, res) => {
  const { surveyTitle, question1, answer1 } = req.body;
  const data = `Survey Title: ${surveyTitle}\nQuestion 1: ${question1}\nAnswer 1: ${answer1}\n\n`;
  fs.appendFile("surveyData.txt", data, (err) => {
    if (err) {
      console.error("error write file:", err);
      res.status(500).send("saving survey data");
    } else {
      console.log("data saved successfully");
      res.redirect("/");
    }
  });
});


//Listening to the ports
app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
