const express = require("express");
const app = express();
const routes = require("./src/routes");
const cors = require("cors");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something broke!" });
});

const PORT = process.env.API_PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
