import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule
} from 'nest-winston';
import { OpenTelemetryModule } from 'nestjs-otel';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
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

const transports = {
  format: winston.format.combine(
    winston.format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike('NestJS'),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize()),
    }),
    // This transport keeps files for specified size and number of days only and then deletes old ones
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    new (require('winston-daily-rotate-file'))({
      level: process.env.LEVEL === 'production' ? 'info' : 'debug',
      dirname: './logs',
      filename: 'PROM.%DATE%.log',
      datePattern: 'MMDD',
      prettyPrint: true,
      maxSize: '10m',
      maxFiles: '7d',
      showLevel: true,
      createSymlink: true,
      symlinkName: 'PROM.log',
    }),

    // This tranport is for normal logging in file without daily roation as above
    // new winston.transports.File({
    //   filename: 'MyLogs.txt',
    //   handleExceptions: true,
    //   level: 'info',
    // }),
    // new winston.transports.Console({
    //   level: 'info',
    // }),
  ],
};
@Module({
  imports: [
    OpenTelemetryModuleConfig,
    ExcelReportModule,
    HttpModule,
    WinstonModule.forRoot(transports),
    // This can be used to apply API rate limiting
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

// This is how a middleware can be implemented
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // Here LoggerMiddleware is implemented that logs all HTTP requests that come
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
