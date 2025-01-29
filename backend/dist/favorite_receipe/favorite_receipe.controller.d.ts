import { Create_Receipe } from 'src/create_receipe/create_receipe.model';
import { FavoriteReceipeService } from './favorite_receipe.service';
export declare class FavoriteReceipeController {
    private readonly favoritereceipeservice;
    constructor(favoritereceipeservice: FavoriteReceipeService);
    create(body: {
        receip_id: number;
        favorite_by: string;
    }): Promise<{
        message: string;
    }>;
    findReceipe(id: string): Promise<Create_Receipe[]>;
    deleteReceipe(id: number, user: string): Promise<{
        message: string;
    }>;
}
