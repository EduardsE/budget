import { Category, Prisma } from "@prisma/client";
import prisma from "config/prisma";

class CategoryService {
  private model = prisma.category;

  public async list() {
    return await this.model.findMany({
      orderBy: {
        title: "asc",
      },
    });
  }

  public async update(id: Category["id"], data: Prisma.CategoryUpdateInput) {
    return await this.model.update({
      where: {
        id,
      },
      data,
    });
  }
}

export default new CategoryService();
