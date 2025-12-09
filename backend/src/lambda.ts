import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import serverless from 'serverless-http';

let cachedServer: any;

async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const app = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        );

        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });

        await app.init();
        cachedServer = serverless(expressApp);
    }
    return cachedServer;
}

export const handler = async (event: any, context: any) => {
    const server = await bootstrap();
    return server(event, context);
};
