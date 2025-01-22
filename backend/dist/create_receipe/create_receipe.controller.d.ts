import { CreateReceipeService } from './create_receipe.service';
import { Create_Receipe } from './create_receipe.model';
export declare class CreateReceipeController {
    private readonly createreceipeservices;
    constructor(createreceipeservices: CreateReceipeService);
    create(data: Partial<Create_Receipe>, file: Express.Multer.File): Promise<Create_Receipe>;
    findAll(): Promise<Create_Receipe[]>;
    findReceipe(id: number): Promise<Create_Receipe>;
}
