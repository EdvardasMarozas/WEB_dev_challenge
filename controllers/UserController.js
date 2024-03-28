const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { userValidate } = require("../requests/UserRequest");
const UserModel = require("../models/UserModel");

function userValidation(req) {
  const errorMessages = validationResult(req);

  if (!errorMessages.isEmpty()) {
    const errorMsg = errorMessages.array();
    return errorMessages;
  } else {
    return true;
  }
}

module.exports = {
  registerPost: async function (req, res, next) {
    const test = await req.body;
    console.log(test);
    console.log("test");
    const [user, valid, messages] = userValidate(req);
    console.log(user);
    if (valid) {
      try {
        const userUnique = await prisma.users.findUnique({
          where: {
            email: user.email,
          },
        });
        if (userUnique) {
          messages.push("This email is currently in use");

          req.session.old = user;
          req.session.messages = messages;
          res
            .status(403)
            .json({ message: "User already exists with that email" });
        } else {
          const password_hashed = await bcrypt.hash(user.password, 10);

          const user_id = await prisma.users.create({
            data: {
              username: user.username,
              email: user.email,
              password: password_hashed,
            },
          });
          if (user_id) {
            req.session.admin_id = user_id;
            req.session.admin_email = user.email;
            res
              .status(200)
              .json({ user: new_user, message: "User created successfully" });
            res.redirect("/panel/" + user_id);
          } else {
            messages.push("Registration failure");

            req.session.old = user;
            req.session.messages = messages;
            res.redirect("/register");
          }
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
      }
    } else {
      req.session.old = user;
      req.session.messages = messages;
      res.redirect("/register");
    }
  },
  loginPost: async (req, res) => {
    const data = req.body;

    const validation = userValidation(req);

    if (validation !== true) {
      return res.status(400).json({ validation });
    } else {
      try {
        const user = await UserModel.showOne(data);
        if (!user) {
          res.status(404).json({
            message: "User with this email does not exist",
            errorFor: "email",
          });
        } else {
          try {
            const passMatch = await bcrypt.compare(
              data.password,
              user.password
            );
            if (passMatch) {
              req.session.user_email = user.email;
              req.session.user_id = user.id;
              res.status(200).json({ user, message: "user is logged in" });
            } else {
              res
                .status(404)
                .json({ message: "Wrong password", errorFor: "password" });
            }
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
    }
  },
  logout: async (req, res) => {
    try {
      delete req.session.user_email;
      delete req.session.user_id;
      res.status(200).json({ message: "User was logged out!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },
};
