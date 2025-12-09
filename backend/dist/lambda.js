"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const serverless = require('serverless-http');
let cachedServer;
async function bootstrap() {
    if (!cachedServer) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });
        await app.init();
        const expressApp = app.getHttpAdapter().getInstance();
        cachedServer = serverless(expressApp);
    }
    return cachedServer;
}
const handler = async (event, context) => {
    const server = await bootstrap();
    return server(event, context);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map