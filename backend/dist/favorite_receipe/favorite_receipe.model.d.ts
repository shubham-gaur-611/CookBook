import { Model } from 'sequelize-typescript';
import { Create_Receipe } from '../create_receipe/create_receipe.model';
export declare class Favorite_Receipe extends Model<Favorite_Receipe> {
    id: number;
    receip_id: number;
    favorite_by: string;
    recipe: Create_Receipe;
    createdAt: Date;
    updatedAt: Date;
}
