import { Model } from 'sequelize-typescript';
export declare class Favorite_Receipe extends Model<Favorite_Receipe> {
    id: string;
    receip_id: string;
    favorite_by: string;
    createdAt: Date;
    updatedAt: Date;
}
