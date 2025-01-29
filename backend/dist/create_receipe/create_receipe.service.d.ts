import { Create_Receipe } from './create_receipe.model';
export declare class CreateReceipeService {
    private create_receipeModel;
    constructor(create_receipeModel: typeof Create_Receipe);
    create(data: Partial<Create_Receipe>): Promise<Create_Receipe>;
    findAll(): Promise<Create_Receipe[]>;
    findRecipe(id: number): Promise<Create_Receipe>;
    findUserRecipe(email: string): Promise<Create_Receipe[]>;
    deleteRecipe(id: number, email: string): Promise<{
        message: string;
    }>;
}
