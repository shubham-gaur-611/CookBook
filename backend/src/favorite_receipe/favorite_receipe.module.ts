import { Module } from '@nestjs/common';
import { FavoriteReceipeController } from './favorite_receipe.controller';
import { FavoriteReceipeService } from './favorite_receipe.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite_Receipe } from './favorite_receipe.model';
import { Create_Receipe } from 'src/create_receipe/create_receipe.model';

@Module({
  imports: [
        SequelizeModule.forFeature([Favorite_Receipe,Create_Receipe]),
      ],
  controllers: [FavoriteReceipeController],
  providers: [FavoriteReceipeService]
})
export class FavoriteReceipeModule {}
