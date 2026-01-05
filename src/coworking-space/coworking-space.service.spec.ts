import { Test, TestingModule } from '@nestjs/testing';
import { CoworkingSpaceService } from './coworking-space.service.js';

describe('CoworkingSpaceService', () => {
  let service: CoworkingSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoworkingSpaceService],
    }).compile();

    service = module.get<CoworkingSpaceService>(CoworkingSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
