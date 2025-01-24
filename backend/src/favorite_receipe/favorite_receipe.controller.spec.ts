import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteReceipeController } from './favorite_receipe.controller';

describe('FavoriteReceipeController', () => {
  let controller: FavoriteReceipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteReceipeController],
    }).compile();

    controller = module.get<FavoriteReceipeController>(FavoriteReceipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
