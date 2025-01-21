import { Test, TestingModule } from '@nestjs/testing';
import { CreateReceipeController } from './create_receipe.controller';

describe('CreateReceipeController', () => {
  let controller: CreateReceipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateReceipeController],
    }).compile();

    controller = module.get<CreateReceipeController>(CreateReceipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
