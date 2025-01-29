import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReceipeService } from './create_receipe.service';
import { Create_Receipe } from './create_receipe.model';
import { storage, fileFilter } from '../common/helpers/file-upload.helper';
import { Public } from 'src/common/decorators/public.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('create-receipe')
export class CreateReceipeController {
  constructor(private readonly createreceipeservices: CreateReceipeService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('receip_image', {
      storage: storage,
      fileFilter: fileFilter,
    }),
  )
  async create(
    @Body() data: Partial<Create_Receipe>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Create_Receipe> {
    if (file) {
      data.receip_image = `/assets/receipe_images/${file.filename}`;
    }
    return await this.createreceipeservices.create(data);
  }

  @Public()
  @Get('getreceipes')
   findAll(): Promise<Create_Receipe[]> {
    return  this.createreceipeservices.findAll();
  }

  @Get('user-recipe')
  findUserRecipe(@GetUser('email') email: string): Promise<Create_Receipe[]> {
   return  this.createreceipeservices.findUserRecipe(email);
 }

  @Public()
  @Get(':id')
   findReceipe(@Param('id') id: number): Promise<Create_Receipe> {
    return  this.createreceipeservices.findRecipe(id);
  }
 
  @Delete(':id')
     deleteReceipe(
      @Param('id', ParseIntPipe) id: number,
      @GetUser('email') user: string,
    ): Promise<{ message: string }> {
      return this.createreceipeservices.deleteRecipe(id, user);
    }
  
}
