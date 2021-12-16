var express = require("express");
var app = express();
var mongoose = require("mongoose");
const cors = require("cors");

app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

require("dotenv/config");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");
const postLikeRouter = require("./routers/postLikeRouter");
const commentLikeRouter = require("./routers/commentLikeRouter");
const friendRouter = require("./routers/friendRouter");
const chatRouter = require("./routers/chatRouter");

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/postlikes", postLikeRouter);
app.use("/commentlikes", commentLikeRouter);
app.use("/friends", friendRouter);
app.use("/chats", chatRouter);

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
