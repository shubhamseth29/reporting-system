import { Test, TestingModule } from '@nestjs/testing';
import { ExcelReportService } from './excel-report.service';

describe('ExcelReportService', () => {
  let service: ExcelReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcelReportService],
    }).compile();

    service = module.get<ExcelReportService>(ExcelReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
