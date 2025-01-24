import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteReceipeService } from './favorite_receipe.service';

describe('FavoriteReceipeService', () => {
  let service: FavoriteReceipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteReceipeService],
    }).compile();

    service = module.get<FavoriteReceipeService>(FavoriteReceipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
