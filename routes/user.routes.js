const express = require("express");
const { Router } = require("express");

const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = Router();
require("dotenv").config();

UserRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await user.save();
      res.status(200).send({ msg: "Registration successfull" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successfull",
            token: jwt.sign({ userID: user._id }, process.env.secr),
          });
        }
      });
    } else {
      res.status(400).send("Wrong credential");
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { UserRouter };
