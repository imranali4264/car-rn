const User = require("../models/User");
const { mongoErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
//login user
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      errors: [
        { title: "Invalid Data", detail: "Enter valid email or password!" }
      ]
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(422).send({ errors: mongoErrors(err, errors) });
    }
    if (!user) {
      return res.status(422).send({
        errors: [{ title: "Invalid User", detail: "User does'nt exist" }]
      });
    }
    if (user.hasSamePassword(password)) {
      //return JWT Token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        config.SECRET,
        { expiresIn: "24h" }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          { title: "Wrong Data", detail: "Email Or Password is incorrect" }
        ]
      });
    }
  });
};
//register user
exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      errors: [{ title: "Invalid Data", detail: "Enter email or password!" }]
    });
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [{ title: "Data incorrect", detail: "Password doesnt match" }]
    });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(422).send({ errors: mongoErrors(err.errors) });
    }
    if (existingUser) {
      return res.status(422).send({
        errors: [{ title: "Invalid Email", detail: "Email Already Exist" }]
      });
    }
    const user = new User({
      username,
      email,
      password
    });
    user.save(err => {
      if (err) {
        return res.status(422).send({ errors: mongoErrors(err.errors) });
      }
      return res.json({ registered: true });
    });
  });
};
//get user by jwt token by id
exports.loginMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, err => {
      if (err) {
        return res.status(422).send({ errors: mongoErrors(err, errors) });
      }
      if (user) {
        res.locals.user = user;
        next();
      } else {
        return res.status(401).send({
          errors: [{ title: "Not Authorized", detail: "You have to login" }]
        });
      }
    });
  } else {
    return res.status(401).send({
      errors: [{ title: "Not Authorized", detail: "You have to login" }]
    });
  }
};

parseToken = token => {
  return jwt.verify(token.split(" ")[1], config.SECRET);
};
