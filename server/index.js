const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { query } = require("./helpers/db");
require("dotenv").config();

const { todoRouter } = require("./routes/todo");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;

app.use("/", todoRouter);
app.listen(port, () => {
  console.log(`app is  listening on port ${port}`);
});
