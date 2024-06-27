const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const User = require("./model/registrationModel");

mongoose
  .connect(
    "mongodb+srv://afzal:hSLwK14BoXDjur3M@cluster0.bsz8dyx.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database is Connected!"));

app.use(express.json());

app.get("/registration-form", (req, res) => {
  res.send("sign up/in page");
  console.log("using get method");
});

app.post("/registration", (req, res) => {
  console.log("using post method");
  const { userName, mobile } = req.body;
  if (userName == "") res.send("name is required");
  else if (mobile == "") res.send("mobile is required");
  else {
    let newUser = new User({
      userName: userName,
      mobile: mobile,
    });
    newUser.save();
    res.send(newUser);
    console.log(newUser);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(updateUser);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.send(deleteUser);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
