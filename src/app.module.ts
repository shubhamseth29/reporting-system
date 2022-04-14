import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelReportModule } from './excel-report/excel-report.module';

@Module({
  imports: [ExcelReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
