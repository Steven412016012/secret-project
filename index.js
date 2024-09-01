import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

/*Make sure that static files are linked to and the CSS shows up.*/
app.use(express.static("public"));

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

/*Pasword Checkers */
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);

/*Sending files
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.ejs");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/views/secret.ejs");
  } else {
    res.sendFile(__dirname + "/views/index.ejs");
    //Alternatively res.redirect("/");
  }
});*/

/* Render files */
app.get("/", (req, res) => {
    res.render("index.ejs");
  });
  
  app.post("/check", (req, res) => {
    if (userIsAuthorised) {
      res.render("secret.ejs");
    } else {
      res.render("index.ejs");
    }
  });

/*Port Listening. */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
