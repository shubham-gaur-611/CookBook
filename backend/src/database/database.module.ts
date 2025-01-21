import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../auth/user.model';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'cookbook_password',
      database: process.env.DB_DATABASE || 'cookbook_db',
      autoLoadModels: true,
      synchronize: false,
      models: [User],
      define: {
        timestamps: true,
        freezeTableName: true
      }
    }),
  ],
})
export class DatabaseModule {}
