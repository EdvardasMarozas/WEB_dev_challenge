const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { userValidate }= require('../requests/UserRequest');

module.exports = {
  registerPost: async function (req, res) {
    const { username, password, email } = req.body;
    try {
      hashedPassword = bcrypt.hash(password, 10);
      const user = await prisma.users.create({
        data: {
          username: username,
          password: hashedPassword,
          email: email
        },
      });
      res.status(201).json({status: 'Created Succesfully', user: { user } })
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  loginPost: async function (req, res) {
    // tikrinti validacija
    try {
      const response = await prisma.product.findMany();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
