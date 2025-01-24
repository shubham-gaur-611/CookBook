import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { Favorite_Receipe } from './favorite_receipe.model';
import { Create_Receipe } from 'src/create_receipe/create_receipe.model';
import { FavoriteReceipeService } from './favorite_receipe.service';  

@Controller('favorite-receipe')
export class FavoriteReceipeController {
  constructor(private readonly favoritereceipeservice: FavoriteReceipeService) { }
    
  @Post('create')
  async create(@Body() body: { receip_id: string; favorite_by: string }) {
    
    return await this.favoritereceipeservice.create(body.receip_id, body.favorite_by);
  }

  @Get(':id')
  async findReceipe(@Param('id') id: string): Promise<Create_Receipe[]> {
    return await this.favoritereceipeservice.findReceipes(id);
  }
  
  @Delete(':id/:user')
async deleteReceipe(
  @Param('id') id: string,
  @Param('user') user: string,
): Promise<{ message: string }> {
  return this.favoritereceipeservice.deleteReceipe(id, user);
}
}
