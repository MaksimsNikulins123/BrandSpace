const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

const stuffAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const stuff = await prisma.stuff.findUnique({
      where: {
        id: decoded.id,
      },
    });
    
    req.stuff = stuff;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Sorry, you are not logged in' });
  }
};

module.exports = {
  stuffAuth,
};
