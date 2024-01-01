const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/TEST", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const con = mongoose.connection;
con.on("open", () => {
  console.log("connected...");
});
app.use(express.json());
app.use("/api", require("./router/router"));
app.listen(8000, () => {
  console.log("server started");
});
