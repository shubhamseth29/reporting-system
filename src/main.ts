import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OpenApiNestFactory } from 'nest-openapi-tools';
import { AppModule } from './app.module';
import otelSDK from './tracing';

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Reporting API')
    .setDescription('Pass a JSON to POST request to build an Excel workbook')
    .setVersion('1.0')
    .addTag('excel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await OpenApiNestFactory.configure(
    app,
    new DocumentBuilder()
      .setTitle('My API')
      .setDescription('An API to do awesome things')
      .addBearerAuth(),
    {
      webServerOptions: {
        enabled: true,
        path: 'api-docs',
      },
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: './openapi.json', // or ./openapi.yaml
      },
      clientGeneratorOptions: {
        enabled: true,
        type: 'typescript-axios',
        outputFolderPath: '../typescript-api-client/src',
        additionalProperties:
          'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
        openApiFilePath: './openapi.json', // or ./openapi.yaml
        skipValidation: true, // optional, false by default
      },
    },
    {
      operationIdFactory: (c: string, method: string) => method,
    },
  );

  await app.listen(3000);
}
bootstrap();
