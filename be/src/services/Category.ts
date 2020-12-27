import prisma from "config/prisma";

class CategoryService {
  private model = prisma.category;

  public async list() {
    return await this.model.findMany();
  }
}

export default new CategoryService();
