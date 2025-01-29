import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Create_Receipe } from './create_receipe.model';

@Injectable()
export class CreateReceipeService {
  constructor(
    @InjectModel(Create_Receipe)
    private create_receipeModel: typeof Create_Receipe,
  ) {}

  create(data: Partial<Create_Receipe>): Promise<Create_Receipe> {
    return this.create_receipeModel.create(data);
  }
  findAll(): Promise<Create_Receipe[]> {
    return this.create_receipeModel.findAll();
  }
  findRecipe(id: number): Promise<Create_Receipe> {
    const oneReceipe = this.create_receipeModel.findByPk(id);
    if (!oneReceipe) {
      throw new NotFoundException(`Receipe with ID ${id} not found`);
    }
    return oneReceipe;
  }

  async findUserRecipe(email: string): Promise<Create_Receipe[]> {
    try {
      const userReceipe = await this.create_receipeModel.findAll({
        where: { posted_by: email },
      });
      return userReceipe;
    } catch (error) {
      console.error('Error finding user recipes:', error);
      throw error;
    }
  }

  async deleteRecipe(id: number, email: string): Promise<{ message: string }> {
    const receipe = await this.create_receipeModel.findOne({
      where: { id: id, posted_by: email },
    });

    if (!receipe) {
      throw new NotFoundException(`Favorite receipe with ID ${id} not found`);
    }

    await receipe.destroy();

    return {
      message: `Favorite receipe with ID ${id} has been deleted successfully`,
    };
  }
}
