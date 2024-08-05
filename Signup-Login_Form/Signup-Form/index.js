const express = require("express");
const app = express();
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  let { email, password, name } = req.body;
  let AlreadyUser = await userModel.findOne({ email });
  if (AlreadyUser) {
    return res.status(500).send("User already registered");
  }
  let user = await userModel.create({
    name,
    email,
    password,
  });
  res.send("User Registered Succesfully!!!");
});
app.listen(3000);
