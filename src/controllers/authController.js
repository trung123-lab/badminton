import { createAccount, checkLogin } from "../service/authService.js";

// Hiển thị trang đăng nhập
const showLogin = (req, res) => {
  res.render("login");
};
// Xử lý đăng nhập
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }
  try {
    const account = checkLogin(username, password);
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
// Hiển thị trang đăng ký
const showRegister = (req, res) => {
  res.render("register", {
    error: null,
    username: "",
  });
};
// Xử lý đăng ký
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await createAccount(username, password);
    res.redirect("/login");
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
