// controllers/authController.js
const  authService = require("../services/authService");

exports.showLogin = (req, res) => {
  res.render("login", { error: null, user: null, layout: false });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.login(username, password);

    // ✅ Save to session
    req.session.user = user;

    // Redirect role ke hisaab se
    if (user.role === "admin") {
       return res.redirect('/index'); // ya /dashboard       
    } else if (user.role === "manager") {
      return res.redirect("/index");
    } else {
      return res.redirect("/index");
    }
  } catch (err) {
    console.error("❌ Login error:", err.message);
    return res.render("login", { error: err.message, layout: false });
  }
};
exports.logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
