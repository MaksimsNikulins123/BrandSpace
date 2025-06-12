const { prisma } = require("../prisma/prisma-client");
const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/stuff/login
 * @desс Логин
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill required filds" });
    }

    const stuff = await prisma.stuff.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect =
      stuff && (await brypt.compare(password, stuff.password));
    const secret = process.env.JWT_SECRET;

    if (stuff && isPasswordCorrect && secret) {
      res.status(200).json({
        id: stuff.id,
        email: stuff.email,
        name: stuff.name,
        token: jwt.sign({ id: stuff.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Incorect login or password" });
    }
  } catch {
    res.status(500).json({ message: "Sorry, something went wrong" });
  }
};

/**
 *
 * @route POST /api/stuff/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;


    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill required fild" });
    }

    const registeredStuff = await prisma.stuff.findFirst({
      where: {
        email,
      },
    });
 

    if (registeredStuff) {
      return res
        .status(400)
        .json({ message: "Stuff with this email already exists" });
    }


    const salt = await brypt.genSalt(10);
    const hashedPassword = await brypt.hash(password, salt);
    // console.log(hashedPassword)
    const stuff = await prisma.stuff.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (stuff && secret) {
      res.status(201).json({
        id: stuff.id,
        email: stuff.email,
        name,
        token: jwt.sign({ id: stuff.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Failed to create new user" });
    }

  } catch {
    res.status(500).json({ message: "Sorry, something went wrong" });
  }
};

/**
 *
 * @route GET /api/stuff/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.stuff);
};

module.exports = {
  login,
  register,
  current,
};
