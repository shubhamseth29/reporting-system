import { Controller, Get } from '@nestjs/common';
import { context, trace } from '@opentelemetry/api';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const span = trace.getSpan(context.active());
    span?.end();
    return this.appService.getHello();
  }
}
