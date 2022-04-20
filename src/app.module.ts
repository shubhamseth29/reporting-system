import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenTelemetryModule } from 'nestjs-otel';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelReportModule } from './excel-report/excel-report.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    defaultMetrics: true,
    apiMetrics: {
      enable: true,
    },
  },
});
@Module({
  imports: [
    OpenTelemetryModuleConfig,
    ExcelReportModule,
    HttpModule,
    // ThrottlerModule.forRoot({
    //   ttl: 5000,
    //   limit: 5000,
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
