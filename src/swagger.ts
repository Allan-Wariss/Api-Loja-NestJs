import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Loja API')
        .setDescription('API Loja application')
        .setVersion('1.0')
        .addTag('loja')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}