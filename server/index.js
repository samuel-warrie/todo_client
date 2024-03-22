const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());
const port = 3001;



const openDB = () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo",
    password: "Warst1ck$",
    port: 5432,
  });
  return pool;
};
app.get("/", (req, res) => {
  const pool = openDB();

  pool.query("SELECT * FROM task ", (err, result) => {
    console.log(err);
    console.log(result);
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(result.rows);
      res.status(200).json({ result: "success" });
    }
  });
});

app.post("/new", (req, res) => {
  const pool = openDB();
  pool.query(
    "insert into task (description) values ($1) returning * ",
    [req.body.description],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({id: result.rows[0].id});
      }
    }
  );
});

// const openDB = (): Pool => {
//     const pool : Pool = new Pool({

//     })
// }

app.listen(port, () => {
  console.log("app is listening on port 3001");
});

