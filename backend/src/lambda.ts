import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const serverless = require('serverless-http');

let cachedServer: any;

async function bootstrap() {
    if (!cachedServer) {
        const app = await NestFactory.create(AppModule);

        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });

        await app.init();

        // Get the underlying Express instance
        const expressApp = app.getHttpAdapter().getInstance();
        cachedServer = serverless(expressApp);
    }
    return cachedServer;
}

export const handler = async (event: any, context: any) => {
    const server = await bootstrap();
    return server(event, context);
};
