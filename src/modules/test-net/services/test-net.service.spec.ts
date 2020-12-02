import { Test, TestingModule } from '@nestjs/testing';
import { TestNetService } from './test-net.service';

describe('TestNetService', () => {
  let service: TestNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestNetService],
    }).compile();

    service = module.get<TestNetService>(TestNetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
