import { Module } from '@nestjs/common';
import { CreateReceipeService } from './create_receipe.service';
import { CreateReceipeController } from './create_receipe.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Create_Receipe } from './create_receipe.model';

@Module({
  imports: [
      SequelizeModule.forFeature([Create_Receipe]),
    ],
  providers: [CreateReceipeService],
  controllers: [CreateReceipeController]
})
export class CreateReceipeModule {}
