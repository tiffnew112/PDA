import { Test, TestingModule } from '@nestjs/testing';
import { CoworkingSpaceController } from './coworking-space.controller';
import { CoworkingSpaceService } from './coworking-space.service';

describe('CoworkingSpaceController', () => {
  let controller: CoworkingSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoworkingSpaceController],
      providers: [CoworkingSpaceService],
    }).compile();

    controller = module.get<CoworkingSpaceController>(CoworkingSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
