import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite_Receipe } from './favorite_receipe.model';
import { Create_Receipe } from 'src/create_receipe/create_receipe.model';

@Injectable()
export class FavoriteReceipeService {
    constructor(
            @InjectModel(Favorite_Receipe)
        private favorite_receipeModel: typeof Favorite_Receipe,
        @InjectModel(Create_Receipe)
        private create_receipeModel: typeof Create_Receipe,
        
        ) { }
    async create(receip_id: string, favorite_by: string): Promise<{message:string}> {
        await this.favorite_receipeModel.create({ receip_id, favorite_by});
        return{message:"Done"}
    }
    
    async findReceipes(id: string): Promise<Create_Receipe[]> {
        const favReceipes = await this.favorite_receipeModel.findAll({
          where: { favorite_by: id },
          attributes: ['receip_id'],
        });
        const receipIds = favReceipes.map((fav) => fav.receip_id);
      
        const recipes = await this.create_receipeModel.findAll({
          where: { id: receipIds },
        });
      
        return recipes;
  }
  async deleteReceipe(id: string,email:string): Promise<{ message: string }> {
    const receipe = await this.favorite_receipeModel.findOne({
      where: { receip_id: id,favorite_by:email }
    });

    if (!receipe) {
      throw new NotFoundException(`Favorite receipe with ID ${id} not found`);
    }

    await receipe.destroy();

    return { message: `Favorite receipe with ID ${id} has been deleted successfully` };
  }

}
