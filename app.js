const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();
const userRouter = require("./routes/user");
dotenv.config();

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send(`
        <h1>Oauth Study</h1>
        <a href = "/user/login"> Log in</a>
        <br>
        <a href = "/user/signup"> SignUp </a>
    `);
});

app.listen(3000, () => {
  console.log("server run 3000");
});
