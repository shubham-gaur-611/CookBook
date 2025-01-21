import { Model } from 'sequelize-typescript';
export declare class Create_Receipe extends Model<Create_Receipe> {
    id: string;
    receip_name: string;
    instructions: string;
    ingredients: string;
    receip_image: string;
    posted_by: string;
    private_receipe: string;
    createdAt: Date;
    updatedAt: Date;
}
