const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRESIN;

exports.authenticate = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const result = await pool.query(`SELECT id, firstname as "firstName", lastname as "lastName", username as "userName", role, password FROM users WHERE userName = $1`, [
      userName,
    ]);

    if (
      !result.rows[0] ||
      !bcrypt.compareSync(password, result.rows[0].password)
    ) {
      throw Error("Неверный пароль");
    }

    const user = result.rows[0];
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: expiresIn });
    // console.log(token);
    res.status(200).json({ ...omitPassword(user), token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function omitPassword(user) {
  const { password, ...userWithoutHash } = user;
  return userWithoutHash;
}

exports.authorize = () => {
  return [
    function authenticateToken(req, res, next) {
      const authHeader = req.headers["authorization"];
      token = authHeader && authHeader.split(" ")[1];

      if (token == null) {
        return res.sendStatus(401).json({ error: "Доступ запрещен" }); //!!!
      }
      jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403).json({ error: "Неавторизован" }); //!!!
        req.user = user;
        // console.log('user:',req)
        next();
      });
    },
  ];
};
