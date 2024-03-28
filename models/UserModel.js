const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const user = {
  showOne: async (userdata) => {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          { username: userdata.username },
          { email: userdata.email },
          { id: userdata.id },
        ],
      },
    });
    return user;
  },
};

module.exports = user;
