import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CreateReceipeModule } from './create_receipe/create_receipe.module';
import { FavoriteReceipeModule } from './favorite_receipe/favorite_receipe.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CreateReceipeModule,
    FavoriteReceipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
