import { Test, TestingModule } from '@nestjs/testing';
import { ReportDto } from 'src/dto/report';
import { ExcelReportService } from '../services/excel-report.service';
import { ExcelReportController } from './excel-report.controller';

describe('ExcelReportController', () => {
  let controller: ExcelReportController;

  const mockReportData: ReportDto = {
    resourceName: 'jestResource',
    accountId: 3438,
    region: 'Europe',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcelReportController],
      providers: [ExcelReportService],
    }).compile();

    controller = module.get<ExcelReportController>(ExcelReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should convert json to excel', () => {
    expect(controller.convertJsonToExcel(mockReportData)).toEqual(
      'Report generated',
    );
  });

  it('should convert excel to json', () => {
    const mockArray = [];
    mockArray.push(mockReportData);
    expect(controller.convertExcelToJson('reportData')).toEqual(mockArray);
  });
});
