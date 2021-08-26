const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

//we're storing our users in here
const users = [];

//to get the input from the forms
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  //this is the file, index.ejs, that'll be shown
  //   res.send("hellooww");
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});

//we're creating the users in here
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      //this is the name from the register file
      name: req.body.name,
      email: req.body.email,
      //this is the hashed password
      password: hashedPassword,
    });
    //if it's successful, direct the user to the login page
    res.redirect("/login");
  } catch {
    //if fails, direct to the register page
    res.redirect("/register");
  }
});

app.listen(3000);
