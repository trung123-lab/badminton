import Account from "../models/account.js";

const showLogin = (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }
  try {
    const account = await Account.findOne({ where: { username, password } });
    if (account) {
      console.log("Login successful");
      console.log("Username:", username);
      console.log("Password:", password);
      res.redirect("/schedule");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Database query error");
  }
};
const showRegister = (req, res) => {
  res.render("register", {
    error: null,
    username: "",
  });
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    await Account.create({ username, password });
    res.redirect("/login");
    console.log("Register successfully");
    console.log("Username:", username);
    console.log("Password:", password);
  } catch (err) {
    console.error("Error inserting into the database:", err.stack);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.render("register", {
        error: "Username already taken",
        username: username,
      });
    }
    res.status(500).send("Database insert error");
  }
};

export { showLogin, login, showRegister, register };
