"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const auth_middleware_1 = require("./middleware/auth.middleware");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/protected', new auth_middleware_1.AuthMiddleware().use);
    const imagesPath = (0, path_1.join)(__dirname, '..', 'src', 'assets', 'receipe_images');
    console.log('Serving images from:', imagesPath);
    app.useStaticAssets(imagesPath, {
        prefix: '/assets/receipe_images',
    });
    app.enableCors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map