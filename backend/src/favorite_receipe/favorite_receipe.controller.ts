import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Create_Receipe } from 'src/create_receipe/create_receipe.model';
import { FavoriteReceipeService } from './favorite_receipe.service';  
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('favorite-receipe')
export class FavoriteReceipeController {
constructor(private readonly favoritereceipeservice: FavoriteReceipeService) { }
  
@Post('create')
async create(@Body() body: { receip_id: number; favorite_by: string }) {
  return await this.favoritereceipeservice.create(body.receip_id, body.favorite_by);
}

@Get('user')
async findReceipe(@GetUser('email') id: string): Promise<Create_Receipe[]> {
  return await this.favoritereceipeservice.findReceipes(id);
}

@Delete(':id')
async deleteReceipe(
  @Param('id', ParseIntPipe) id: number,
  @GetUser('email') user: string,
): Promise<{ message: string }> {
  return this.favoritereceipeservice.deleteReceipe(id, user);
}
}
