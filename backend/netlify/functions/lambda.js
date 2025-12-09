"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./_lib/app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const serverless_http_1 = require("serverless-http");
let cachedServer;
async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        });
        await app.init();
        cachedServer = (0, serverless_http_1.default)(expressApp);
    }
    return cachedServer;
}
const handler = async (event, context) => {
    const server = await bootstrap();
    return server(event, context);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map