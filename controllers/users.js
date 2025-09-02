const User = require("../models/user");

//Signup Form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

//Signup Logic implemented in routes/user.js
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlist");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//Login Form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

//Login Logic implemented in routes/user.js
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to your Wanderlist");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out. Goodbye!");
    res.redirect("/listings");
  });
};
