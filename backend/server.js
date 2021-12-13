var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.use(express.json());
var fs = require("fs");
var path = require("path");
require("dotenv/config");

const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");

app.use("/users", userRouter);
app.use("/posts", postRouter);

const dbURI = process.env.MONGO_URL;
const port = process.env.PORT || 8000;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    })
  )
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
