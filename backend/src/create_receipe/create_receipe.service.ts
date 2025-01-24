import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Create_Receipe } from './create_receipe.model';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class CreateReceipeService {
    constructor(
        @InjectModel(Create_Receipe)
        private create_receipeModel: typeof Create_Receipe,
    ) { }
    
    async create(data: Partial<Create_Receipe>): Promise<Create_Receipe> {
        return  await this.create_receipeModel.create(data);
    }
    async findAll(): Promise<Create_Receipe[]>{
        return await this.create_receipeModel.findAll();
    }
    async findReceipe(id: number): Promise<Create_Receipe>{
        const oneReceipe = await this.create_receipeModel.findByPk(id);
        if (!oneReceipe) {
            throw new NotFoundException(`Receipe with ID ${id} not found`);
          }
          return oneReceipe;
    }
    
}
