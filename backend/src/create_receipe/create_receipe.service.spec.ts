import { Test, TestingModule } from '@nestjs/testing';
import { CreateReceipeService } from './create_receipe.service';

describe('CreateReceipeService', () => {
  let service: CreateReceipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateReceipeService],
    }).compile();

    service = module.get<CreateReceipeService>(CreateReceipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
