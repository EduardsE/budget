import prisma from "config/prisma";

class UserService {
  public async list() {
    return await prisma.user.findMany();
  }
}

export default new UserService();
