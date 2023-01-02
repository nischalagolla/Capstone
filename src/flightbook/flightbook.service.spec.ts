import { Test, TestingModule } from '@nestjs/testing';
import { FlightbookService } from './flightbook.service';

describe('FlightbookService', () => {
  let service: FlightbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightbookService],
    }).compile();

    service = module.get<FlightbookService>(FlightbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
