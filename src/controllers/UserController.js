import User from "../models/User.js";
import bcrypt from "bcrypt";

export const addUser = (req, res, next) => {
  User.find({ userName: req.body.userName })
    .then((result) => {
      if (result.length) {
        res.send({ errorMessage: "user-name already taken!" });
      } else {
        bcrypt.hash(req.body.userPassword, 10, (error, hash) => {
          const users = new User({
            userName: req.body.userName,
            userEmailId: req.body.emailId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userPassword: hash,
          });

          users
            .save()
            .then((result) => {
              res.send("User added");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = (req, res, next) => {
  req.session.isLoggedIn = true;

  User.find({
    $or: [{ userName: req.body.userName }, { userEmailId: req.body.userName }],
  })
    .then((result) => {
      if (result.length) {
        bcrypt.compare(
          req.body.userPassword,
          result[0].userPassword,
          (error, result) => {
            if (result) {
              res.send({ isAuthenticated: true, message: "logged in" });
            } else {
              res.send({ message: "invalid username or password" });
            }
          }
        );
      } else {
        res.send({ message: "user does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
