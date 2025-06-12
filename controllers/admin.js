const { prisma } = require("../prisma/prisma-client");
const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/admin/login
 * @desс Логин
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill required filds" });
    }

    const admin = await prisma.stuff.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect =
    admin && (await brypt.compare(password, admin.password));
    const secret = process.env.JWT_SECRET;

    if (admin && isPasswordCorrect && secret) {
      res.status(200).json({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        token: jwt.sign({ id: admin.id }, secret, { expiresIn: "30d" }),
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
 * @route POST /api/admin/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;


    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill required fild" });
    }

    // const registeredUser = await prisma.user.findFirst({
    //   where: {
    //     email,
    //   },
    // });
    
    const adminEmails = process.env.ADMIN_EMAILS;

    if(!adminEmails.includes(email)) {
        console.log("Admin email not allowed")
        return res.status(400).json({ message: "Something went wrong on the client" });
    }

    const registeredAdmin = await prisma.stuff.findFirst({
      where: {
        email
      },
    });
 

    if (registeredAdmin) {
        console.error("Admin with this email already exists")
      return res
        .status(400)
        .json({ message: "Something went wrong on the client" });
    }
   

    const salt = await brypt.genSalt(10);
    const hashedPassword = await brypt.hash(password, salt);
    // console.log(hashedPassword)

    const admin = await prisma.stuff.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    const secret = process.env.JWT_SECRET;

    if (admin && secret) {
      res.status(201).json({
        id: admin.id,
        email: admin.email,
        name,
        token: jwt.sign({ id: admin.id }, secret, { expiresIn: "30d" }),
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
 * @route GET /api/admin/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
