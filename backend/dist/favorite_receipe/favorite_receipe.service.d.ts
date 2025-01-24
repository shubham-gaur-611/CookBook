import { Favorite_Receipe } from './favorite_receipe.model';
import { Create_Receipe } from 'src/create_receipe/create_receipe.model';
export declare class FavoriteReceipeService {
    private favorite_receipeModel;
    private create_receipeModel;
    constructor(favorite_receipeModel: typeof Favorite_Receipe, create_receipeModel: typeof Create_Receipe);
    create(receip_id: string, favorite_by: string): Promise<{
        message: string;
    }>;
    findReceipes(id: string): Promise<Create_Receipe[]>;
    deleteReceipe(id: string, email: string): Promise<{
        message: string;
    }>;
}
