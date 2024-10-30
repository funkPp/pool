const express = require("express");
const app = express();
const routes = require("./src/routes");

const { body, validationResult } = require("express-validator");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());

app.post(
  "/users",
  body("email").isEmail(),
  body("name").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  routes
);

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
